# Stay Focused

A browser extension that blocks distracting websites while a focus timer is running.

## What it does

- You set a timer (e.g. 25 minutes) and click Start.
- While the timer runs, any site on your block list will not load — it redirects to a "Stay focused" message instead.
- You can add or remove sites from the block list at any time from the popup.
- Pre-loaded block list: YouTube, Twitter/X, Facebook, Instagram, Reddit, TikTok. Remove any you don't want blocked.
- The timer keeps running even if you close the popup, switch tabs, or restart your browser — it only stops when the time is up or you click "End Session."

## How to install it in your browser

This extension is not on the Chrome Web Store. You load it manually ("unpacked"), which takes about a minute. Works in Chrome, Edge, Brave, and other Chromium-based browsers.

**Step 1: Get the files onto your computer**
- If you downloaded a `.zip`, unzip it first. You should end up with a folder (e.g. `focus-extension`) containing files like `manifest.json`, `background.js`, `popup.html`, etc.
- If you cloned/downloaded this from GitHub, that folder is what you already have.

**Step 2: Open your browser's extensions page**
- Chrome: go to `chrome://extensions`
- Edge: go to `edge://extensions`

**Step 3: Turn on Developer mode**
- Look for a toggle labeled "Developer mode" — usually top-right of the page. Switch it on.

**Step 4: Load the extension**
- Click the **"Load unpacked"** button that appears.
- In the file picker, select the entire `focus-extension` folder (the one containing `manifest.json` — not a zip, and not a file inside it).
- Click "Select Folder" / "Open."

**Step 5: Done**
- A target icon (🎯) appears in your browser's toolbar (you may need to click the puzzle-piece icon to pin it).
- Click it to open the popup, set a timer, and start a focus session.

## Common issues

- **"Manifest file is missing or unreadable"** — you selected the zip file or a file inside the folder instead of the folder itself. Go back to Step 4 and select the whole folder.
- **Icon doesn't show in the toolbar** — click the puzzle-piece (extensions) icon in the toolbar and pin "Stay Focused."
- **A blocked site still loads** — make sure a session is actually active (popup should show a countdown), and that the site's domain is in your block list exactly as it appears in the address bar (e.g. `youtube.com`, not `https://youtube.com`).

## Want it on Firefox?

This version is built for Chromium browsers. Firefox uses a different manifest format — ask and I can adapt it.
