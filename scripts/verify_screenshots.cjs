const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--window-size=1440,1000',
    'http://localhost:3000/'
  ]);

  // wait for chrome to start
  await new Promise(r => setTimeout(r, 2000));

  // get ws url
  const res = await fetch('http://127.0.0.1:9223/json/list');
  const tabs = await res.json();
  const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
  const wsUrl = pageTab.webSocketDebuggerUrl;

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
  await send('Page.enable');
  await send('DOM.enable');

  // Screenshot 1: Home page with cheetah paw trigger
  await new Promise(r => setTimeout(r, 1500));
  let result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('home_with_paw_selector.png', Buffer.from(result.data, 'base64'));
  console.log('Saved home_with_paw_selector.png');

  // Screenshot 2: Click paw button to open transparent sidebar drawer and hover collections
  await send('Runtime.evaluate', {
    expression: `
      const btn = document.querySelector('button[aria-label="open navigation"]');
      if (btn) btn.click();
    `
  });
  await new Promise(r => setTimeout(r, 800));

  // Simulate mouseenter on collections trigger
  await send('Runtime.evaluate', {
    expression: `
      const collectionsBtn = Array.from(document.querySelectorAll('button')).find(el => el.textContent.toLowerCase().includes('collections'));
      if (collectionsBtn) {
        collectionsBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        collectionsBtn.click();
      }
    `
  });
  await new Promise(r => setTimeout(r, 800));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('sidebar_transparent_drawer.png', Buffer.from(result.data, 'base64'));
  console.log('Saved sidebar_transparent_drawer.png');

  // Screenshot 3: Navigate to Retail
  await send('Page.navigate', { url: 'http://localhost:3000/retail' });
  await new Promise(r => setTimeout(r, 1500));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('retail_verified.png', Buffer.from(result.data, 'base64'));
  console.log('Saved retail_verified.png');

  // Screenshot 4: Navigate to Hayrat
  await send('Page.navigate', { url: 'http://localhost:3000/hayrat' });
  await new Promise(r => setTimeout(r, 1500));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('hayrat_verified.png', Buffer.from(result.data, 'base64'));
  console.log('Saved hayrat_verified.png');

  // Screenshot 5: Navigate to Philosophy
  await send('Page.navigate', { url: 'http://localhost:3000/philosophy' });
  await new Promise(r => setTimeout(r, 1500));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('philosophy_verified.png', Buffer.from(result.data, 'base64'));
  console.log('Saved philosophy_verified.png');

  ws.close();
  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
