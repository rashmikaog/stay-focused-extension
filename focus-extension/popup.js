// popup.js — drives the popup UI

const idleView = document.getElementById("idleView");
const activeView = document.getElementById("activeView");
const durationInput = document.getElementById("durationInput");
const startBtn = document.getElementById("startBtn");
const testStartBtn = document.getElementById("testStartBtn");
const stopBtn = document.getElementById("stopBtn");
const countdownEl = document.getElementById("countdown");
const siteInput = document.getElementById("siteInput");
const addBtn = document.getElementById("addBtn");
const siteList = document.getElementById("siteList");
const siteError = document.getElementById("siteError");

let tickInterval = null;

function sendMessage(msg) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Stay Focused: message failed —", chrome.runtime.lastError.message);
        resolve({ ok: false, reason: "no_response" });
        return;
      }
      resolve(response || { ok: false, reason: "empty_response" });
    });
  });
}

function formatTime(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function renderSiteList(blockList) {
  siteList.innerHTML = "";
  blockList.forEach((site) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = site;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.title = "Remove";
    removeBtn.addEventListener("click", async () => {
      const res = await sendMessage({ type: "REMOVE_SITE", site });
      renderSiteList(res.blockList);
    });
    li.appendChild(span);
    li.appendChild(removeBtn);
    siteList.appendChild(li);
  });
}

function startTicking(endTime) {
  clearInterval(tickInterval);
  function tick() {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      clearInterval(tickInterval);
      showIdle();
      return;
    }
    
    countdownEl.textContent = formatTime(remaining);

    const totalSec = Math.max(0, Math.floor(remaining / 1000));
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;

    document.getElementById("minutesBox").textContent = m.toString().padStart(2, "0");
    document.getElementById("secondsBox").textContent = s.toString().padStart(2, "0");
  }
  tick();
  tickInterval = setInterval(tick, 1000);
}

function showActive(endTime) {
  idleView.classList.add("hidden");
  activeView.classList.remove("hidden");
  startTicking(endTime);
}

function showIdle() {
  clearInterval(tickInterval);
  activeView.classList.add("hidden");
  idleView.classList.remove("hidden");
}

async function init() {
  const state = await sendMessage({ type: "GET_STATE" });
  renderSiteList(state.blockList || []);
  if (state.sessionActive && state.sessionEndTime) {
    showActive(state.sessionEndTime);
  } else {
    showIdle();
  }
}

startBtn.addEventListener("click", async () => {
  if (startBtn.disabled) return;
  startBtn.disabled = true;
  try {
    const minutes = Math.max(1, Math.min(180, parseInt(durationInput.value, 10) || 25));
    const res = await sendMessage({ type: "START_SESSION", minutes });
    if (res && res.ok) {
      showActive(res.endTime);
    }
  } finally {
    startBtn.disabled = false;
  }
});

testStartBtn.addEventListener("click", async () => {
  if (testStartBtn.disabled) return;
  testStartBtn.disabled = true;
  try {
    const res = await sendMessage({ type: "START_SESSION", seconds: 60, minutes: 1 });
    if (res && res.ok) {
      showActive(res.endTime);
    }
  } finally {
    testStartBtn.disabled = false;
  }
});

stopBtn.addEventListener("click", async () => {
  stopBtn.disabled = true;
  try {
    await sendMessage({ type: "STOP_SESSION" });
    showIdle();
  } finally {
    stopBtn.disabled = false;
  }
});

addBtn.addEventListener("click", async () => {
  siteError.classList.add("hidden");
  const value = siteInput.value.trim();
  if (!value) return;
  const res = await sendMessage({ type: "ADD_SITE", site: value });
  if (res.ok) {
    siteInput.value = "";
    renderSiteList(res.blockList);
  } else {
    siteError.textContent =
      res.reason === "duplicate"
        ? "That site is already on your block list."
        : "Enter a valid domain, e.g. youtube.com";
    siteError.classList.remove("hidden");
  }
});

siteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

init();
