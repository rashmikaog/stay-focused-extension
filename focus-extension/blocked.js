// blocked.js
const params = new URLSearchParams(location.search);
const rawSite = params.get("site");
if (rawSite) {
  try {
    const cleanSite = rawSite.replace(/^(https?:\/\/)?(www\.)?/, '');
    document.getElementById("siteName").textContent = cleanSite;
  } catch (e) {
    document.getElementById("siteName").textContent = rawSite;
  }
}

document.getElementById("backBtn").addEventListener("click", () => {
  if (history.length > 1) {
    history.back();
  } else {
    try {
      window.close();
    } catch(e) {
      location.href = "about:blank"; 
    }
  }
});

function tick() {
  try {
    chrome.runtime.sendMessage({ type: "GET_STATE" }, (state) => {
      if (chrome.runtime.lastError) {
        document.getElementById("countdown").textContent = "—";
        return;
      }
      
      if (!state || !state.sessionActive || !state.sessionEndTime) {
        handleSessionEnd();
        return;
      }
      
      const remaining = state.sessionEndTime - Date.now();
      
      if (remaining <= 0) {
        handleSessionEnd();
        return;
      }
      
      const totalSec = Math.floor(remaining / 1000);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      document.getElementById("countdown").textContent =
        `${m}:${s.toString().padStart(2, "0")} remaining`;
    });
  } catch (e) {
    document.getElementById("countdown").textContent = "—";
  }
}

function handleSessionEnd() {
  document.getElementById("countdown").textContent = "Session ended!";
  document.getElementById("countdown").style.color = "#34c759"; 
  const targetUrl = params.get("url") || params.get("site");
  if (targetUrl) {
    setTimeout(() => {
      location.href = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
    }, 1000);
  }
}

tick();
setInterval(tick, 1000);