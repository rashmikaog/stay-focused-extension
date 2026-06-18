* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 320px;
  background: #1a1a2e;
  color: #f0f0f5;
}

.container {
  padding: 16px;
}

header h1 {
  font-size: 18px;
  margin-bottom: 12px;
  text-align: center;
}

.card {
  background: #232342;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
}

.card h2 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
  margin-bottom: 10px;
}

label {
  display: block;
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 6px;
}

input[type="number"],
input[type="text"] {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #3a3a5e;
  background: #16162b;
  color: #f0f0f5;
  font-size: 14px;
  margin-bottom: 10px;
}

input[type="number"]:focus,
input[type="text"]:focus {
  outline: none;
  border-color: #6c63ff;
}

.primary-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #6c63ff;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.primary-btn:hover {
  background: #5a52e0;
}

.secondary-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #e74c3c;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.secondary-btn:hover {
  background: #c0392b;
}

.status-label {
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 6px;
  text-align: center;
}

.countdown {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 14px;
  font-variant-numeric: tabular-nums;
  color: #6c63ff;
}

.hidden {
  display: none;
}

.add-row {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.add-row input {
  flex: 1;
  margin-bottom: 0;
}

.add-row button {
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: #3a3a5e;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.add-row button:hover {
  background: #4a4a78;
}

#siteList {
  list-style: none;
  margin-top: 8px;
  max-height: 180px;
  overflow-y: auto;
}

#siteList li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  font-size: 13px;
  border-bottom: 1px solid #2e2e50;
}

#siteList li:last-child {
  border-bottom: none;
}

#siteList button {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;
}
