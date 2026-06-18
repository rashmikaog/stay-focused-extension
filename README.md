// popup.js — drives the popup UI

const idleView = document.getElementById("idleView");
const activeView = document.getElementById("activeView");
const durationInput = document.getElementById("durationInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const countdownEl = document.getElementById("countdown");
const siteInput = document.getElementById("siteInput");
const addBtn = document.getElementById("addBtn");
const siteList = document.getElementById("siteList");

let tickInterval = null;

function sendMessage(msg) {
  return new Promise((resolve) => chrome.runtime.sendMessage(msg, resolve));
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
  renderSiteList(state.blockList);
  if (state.sessionActive && state.sessionEndTime) {
    showActive(state.sessionEndTime);
  } else {
    showIdle();
  }
}

startBtn.addEventListener("click", async () => {
  const minutes = Math.max(1, Math.min(180, parseInt(durationInput.value, 10) || 25));
  const res = await sendMessage({ type: "START_SESSION", minutes });
  if (res.ok) {
    const state = await sendMessage({ type: "GET_STATE" });
    showActive(state.sessionEndTime);
  }
});

stopBtn.addEventListener("click", async () => {
  await sendMessage({ type: "STOP_SESSION" });
  showIdle();
});

addBtn.addEventListener("click", async () => {
  const value = siteInput.value.trim();
  if (!value) return;
  const res = await sendMessage({ type: "ADD_SITE", site: value });
  if (res.ok) {
    siteInput.value = "";
    renderSiteList(res.blockList);
  }
});

siteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

init();
