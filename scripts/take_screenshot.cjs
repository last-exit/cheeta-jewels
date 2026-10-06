const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1440,1100',
    'http://localhost:3000'
  ]);

  // wait for chrome to start
  await new Promise(r => setTimeout(r, 2000));

  // get ws url
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await res.json();
  const wsUrl = tabs[0].webSocketDebuggerUrl;

  const ws = new globalThis.WebSocket(wsUrl);

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const curId = id++;
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  // Scroll to #characters
  await send('Runtime.evaluate', {
    expression: `
      const el = document.getElementById('characters');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    `
  });

  await new Promise(r => setTimeout(r, 1500));

  // Take screenshot
  const result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('atelier_fitting_verified.png', Buffer.from(result.data, 'base64'));
  console.log('Saved atelier_fitting_verified.png successfully');

  ws.close();
  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
