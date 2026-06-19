// background.js — Service worker: manages timer state and blocks sites during focus sessions

const DEFAULTS = {
  blockList: ["youtube.com", "twitter.com", "x.com", "facebook.com", "instagram.com", "reddit.com", "tiktok.com"],
  sessionActive: false,
  sessionEndTime: null,
  sessionDurationMin: 25
};

// ---- Init defaults on install ----
chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.local.get(null);
  const toSet = {};
  for (const key in DEFAULTS) {
    if (!(key in existing)) toSet[key] = DEFAULTS[key];
  }
  if (Object.keys(toSet).length) await chrome.storage.local.set(toSet);
  await resyncAlarm();
});

// ---- Re-sync on browser startup: catches the case where the alarm was
// missed while the browser/service worker was asleep or closed ----
chrome.runtime.onStartup.addListener(async () => {
  await checkSessionExpiry();
  await resyncAlarm();
});

// If a session is active, make sure an alarm exists for its end time.
// If it already expired, clear it immediately rather than waiting for
// the next popup open or navigation event.
async function resyncAlarm() {
  const state = await getState();
  if (state.sessionActive && state.sessionEndTime) {
    if (Date.now() >= state.sessionEndTime) {
      await chrome.storage.local.set({ sessionActive: false, sessionEndTime: null });
      chrome.alarms.clear("focusSessionEnd");
    } else {
      chrome.alarms.create("focusSessionEnd", { when: state.sessionEndTime });
    }
  }
}

// ---- Helper: get current state ----
async function getState() {
  const data = await chrome.storage.local.get(["blockList", "sessionActive", "sessionEndTime", "sessionDurationMin"]);
  return { ...DEFAULTS, ...data };
}

// ---- Helper: check + auto-expire session ----
async function checkSessionExpiry() {
  const state = await getState();
  if (state.sessionActive && state.sessionEndTime && Date.now() >= state.sessionEndTime) {
    await chrome.storage.local.set({ sessionActive: false, sessionEndTime: null });
    return { ...state, sessionActive: false, sessionEndTime: null };
  }
  return state;
}

// ---- Alarm to end session precisely on time ----
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "focusSessionEnd") {
    await chrome.storage.local.set({ sessionActive: false, sessionEndTime: null });
  }
});

// ---- Messages from popup ----
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg.type === "START_SESSION") {
      // msg.seconds takes priority if provided (used for quick testing);
      // otherwise fall back to minutes. Always clamp to a sane minimum.
      const totalMs = msg.seconds
        ? Math.max(5, msg.seconds) * 1000
        : Math.max(1, msg.minutes || 25) * 60 * 1000;
      const endTime = Date.now() + totalMs;
      await chrome.storage.local.set({
        sessionActive: true,
        sessionEndTime: endTime,
        sessionDurationMin: msg.minutes || 25
      });
      chrome.alarms.create("focusSessionEnd", { when: endTime });
      sendResponse({ ok: true, endTime });
    } else if (msg.type === "STOP_SESSION") {
      await chrome.storage.local.set({ sessionActive: false, sessionEndTime: null });
      chrome.alarms.clear("focusSessionEnd");
      sendResponse({ ok: true });
    } else if (msg.type === "GET_STATE") {
      const state = await checkSessionExpiry();
      sendResponse(state);
    } else if (msg.type === "ADD_SITE") {
      const state = await getState();
      const site = normalizeHost(msg.site);
      if (!site) {
        sendResponse({ ok: false, reason: "invalid", blockList: state.blockList });
      } else if (state.blockList.includes(site)) {
        sendResponse({ ok: false, reason: "duplicate", blockList: state.blockList });
      } else {
        const updated = [...state.blockList, site];
        await chrome.storage.local.set({ blockList: updated });
        sendResponse({ ok: true, blockList: updated });
      }
    } else if (msg.type === "REMOVE_SITE") {
      const state = await getState();
      const updated = state.blockList.filter((s) => s !== msg.site);
      await chrome.storage.local.set({ blockList: updated });
      sendResponse({ ok: true, blockList: updated });
    }
  })();
  return true; // keep channel open for async response
});

function normalizeHost(input) {
  if (!input) return null;
  let s = input.trim().toLowerCase();
  s = s.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split("?")[0];
  if (!s || !s.includes(".")) return null; // must look like a real domain
  return s;
}

// ---- Block navigation during active sessions ----
chrome.webNavigation?.onBeforeNavigate?.addListener?.(async (details) => {
  if (details.frameId !== 0) return; // only top-level frames
  const state = await checkSessionExpiry();
  if (!state.sessionActive) return;

  let host;
  try {
    host = new URL(details.url).hostname.replace(/^www\./, "");
  } catch (e) {
    return;
  }

  const isBlocked = state.blockList.some((site) => host === site || host.endsWith("." + site));
  if (isBlocked) {
    // FIX HERE: Add &url= to pass the full destination details to blocked.html
    const blockedUrl = chrome.runtime.getURL("blocked.html") + 
                       "?site=" + encodeURIComponent(host) + 
                       "&url=" + encodeURIComponent(details.url);
    chrome.tabs.update(details.tabId, { url: blockedUrl });
  }
});