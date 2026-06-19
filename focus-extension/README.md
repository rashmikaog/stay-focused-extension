# Stay Focused

A lightweight browser extension that helps you stay productive by blocking distracting websites while a focus session is active.

---

## Overview

Stay Focused allows you to create distraction-free work sessions by temporarily blocking websites that commonly interrupt your concentration.

When a focus session starts, websites in your block list are automatically blocked until the timer expires or you manually end the session.

The timer continues running even if you:

* Close the popup
* Switch tabs
* Minimize the browser
* Restart the browser

---

## Features

* Custom focus timer
* Website blocking during active sessions
* Editable block list
* Persistent countdown timer
* One-click test session
* Simple and lightweight interface

### Default Block List

The extension comes pre-configured with:

* youtube.com
* x.com
* facebook.com
* instagram.com
* reddit.com
* tiktok.com

You can remove any of these or add your own websites at any time.

---

## How It Works

1. Open the extension popup.
2. Set a focus duration.
3. Click **Start Session**.
4. Websites in your block list become inaccessible.
5. The extension redirects blocked sites to a focus message page.
6. Blocking automatically ends when the timer expires or when you click **End Session**.

---

## Installation

This extension is not currently available on the Chrome Web Store and must be loaded manually.

### 1. Download the Project

Clone the repository or download it as a ZIP file and extract it.

The project folder should contain files such as:

```text
focus-extension/
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── blocked.html
└── ...
```

### 2. Open the Extensions Page

Chrome:

```text
chrome://extensions
```

Edge:

```text
edge://extensions
```

Brave:

```text
brave://extensions
```

### 3. Enable Developer Mode

Turn on **Developer Mode** from the top-right corner of the extensions page.

### 4. Load the Extension

1. Click **Load unpacked**.
2. Select the **focus-extension** folder.
3. Make sure you select the **entire folder containing `manifest.json`**.
4. Do **not** select:

   * The ZIP file
   * A file inside the folder
   * A subfolder within the project
5. Click **Open** or **Select Folder**.

If you can see `manifest.json` directly inside the selected **focus-extension** folder, you've chosen the correct folder.

### 5. Start Using the Extension

After installation, the extension icon should appear in your browser toolbar.

If it is not visible:

1. Open the Extensions menu.
2. Locate **Stay Focused**.
3. Pin the extension to the toolbar.

---

## Quick Test

To verify that everything is working correctly:

1. Open the extension popup.
2. Click **Start 1-Minute Test Session**.
3. Visit a website from the block list.
4. Confirm that the website is redirected to the focus page.

---

## Managing Blocked Websites

You can add or remove websites directly from the popup interface.

### Correct Format

```text
youtube.com
reddit.com
facebook.com
```

### Incorrect Format

```text
https://youtube.com
https://reddit.com
www.facebook.com
```

Use only the domain name.

---

## Troubleshooting

### Manifest file is missing or unreadable

You likely selected:

* A ZIP file
* A file inside the project folder
* The wrong folder

Go back to the installation steps and make sure you select the **focus-extension** folder containing `manifest.json`.

### Extension icon is not visible

Open the browser's Extensions menu and pin **Stay Focused** to the toolbar.

### A blocked site still loads

Verify that:

* A focus session is active
* The countdown timer is running
* The website exists in the block list
* The domain name is entered correctly

---

## Browser Support

Supported browsers:

* Google Chrome
* Microsoft Edge
* Brave
* Other Chromium-based browsers

Firefox support can be added with minor modifications.

---

## License

This project is available under the MIT License.
