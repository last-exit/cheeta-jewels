const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--disable-gpu',
    '--window-size=1440,1000',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const res = await fetch('http://127.0.0.1:9227/json/list');
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

  await new Promise(r => setTimeout(r, 1500));

  // Screenshot 1: Home page at rest (Cheetah Paw trigger in top-left)
  let result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('home_paw_trigger_rest.png', Buffer.from(result.data, 'base64'));
  console.log('Saved home_paw_trigger_rest.png');

  // Screenshot 2: Click Cheetah Paw to drop down the transparent menu
  await send('Runtime.evaluate', {
    expression: `
      const btn = document.querySelector('button[aria-label="open navigation"]');
      if (btn) btn.click();
    `
  });
  await new Promise(r => setTimeout(r, 600));

  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('paw_dropdown_opened.png', Buffer.from(result.data, 'base64'));
  console.log('Saved paw_dropdown_opened.png');

  // Screenshot 3: Hover Collections in the dropped-down menu
  await send('Runtime.evaluate', {
    expression: `
      const collectionsBtn = Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Collections'));
      if (collectionsBtn) {
        collectionsBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        collectionsBtn.click();
      }
    `
  });
  await new Promise(r => setTimeout(r, 600));

  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('paw_dropdown_collections_hover.png', Buffer.from(result.data, 'base64'));
  console.log('Saved paw_dropdown_collections_hover.png');

  // Screenshot 4: Navigate to Retail
  await send('Page.navigate', { url: 'http://localhost:3000/retail' });
  await new Promise(r => setTimeout(r, 1500));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('retail_paw_and_cj.png', Buffer.from(result.data, 'base64'));
  console.log('Saved retail_paw_and_cj.png');

  ws.close();
  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
