# Stay Focused

A browser extension that blocks distracting websites while a focus timer is running.

## What it does

* Set a timer and start a focus session.
* Websites on your block list are blocked until the timer ends.
* Add or remove websites from the block list at any time.
* The timer keeps running even if you close the popup, switch tabs, or restart your browser.
* Includes a **1-minute test session** for quickly checking that blocking works.

### Default blocked websites

* youtube.com
* x.com
* facebook.com
* instagram.com
* reddit.com
* tiktok.com

---

## Installation

### 1. Download the files

Download or clone the project and make sure you have the **focus-extension** folder.

Example:

```text
focus-extension/
├── manifest.json
├── background.js
├── popup.html
└── ...
```

### 2. Open your browser's extensions page

Chrome:

```text
chrome://extensions
```

Edge:

```text
edge://extensions
```

### 3. Enable Developer Mode

Turn on **Developer Mode**.

### 4. Load the extension

* Click **Load unpacked**
* Select the **focus-extension** folder
* Make sure the folder contains **manifest.json**
* Click **Open** or **Select Folder**

### 5. Done

The extension should now appear in your browser toolbar.

---

## Quick Test

1. Open the extension.
2. Click **Start 1-Minute Test Session**.
3. Visit a blocked website.
4. You should be redirected to the focus page.

---

## Common Issues

**"Manifest file is missing or unreadable"**

You probably selected the ZIP file or the wrong folder. Select the **focus-extension** folder that contains `manifest.json`.

**Blocked sites still load**

Make sure a focus session is active and the website is in your block list.

---

## Browser Support

* Chrome
* Edge
* Brave
* Other Chromium-based browsers

Firefox support can be added with a few modifications.
