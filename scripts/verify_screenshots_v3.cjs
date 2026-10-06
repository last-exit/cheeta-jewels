const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--window-size=1440,1000',
    'http://localhost:3000/'
  ]);

  // wait for chrome to start
  await new Promise(r => setTimeout(r, 2000));

  // get ws url
  const res = await fetch('http://127.0.0.1:9225/json/list');
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

  // Screenshot 1: Home page showing Chrome Hearts inspired transparent navigation
  let result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('home_chromehearts_nav.png', Buffer.from(result.data, 'base64'));
  console.log('Saved home_chromehearts_nav.png');

  // Screenshot 2: Hover Collections in navigation
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
  fs.writeFileSync('home_collections_hover.png', Buffer.from(result.data, 'base64'));
  console.log('Saved home_collections_hover.png');

  // Screenshot 3: Navigate to Retail - verify transparent CJ logo and NO divider lines
  await send('Page.navigate', { url: 'http://localhost:3000/retail' });
  await new Promise(r => setTimeout(r, 1500));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('retail_transparent_cj_header.png', Buffer.from(result.data, 'base64'));
  console.log('Saved retail_transparent_cj_header.png');

  // Screenshot 4: Scroll down on Retail - verify CJ logo smoothly hides so it doesn't overlap text!
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 350, behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 600));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('retail_scrolled_no_overlap.png', Buffer.from(result.data, 'base64'));
  console.log('Saved retail_scrolled_no_overlap.png');

  // Screenshot 5: Check Home lookbook section (where user uploaded media_1790542987678.png) to verify line is removed
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 1500));
  await send('Runtime.evaluate', {
    expression: `
      const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('the double barrel'));
      if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  });
  await new Promise(r => setTimeout(r, 800));
  result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('home_lookbook_no_line.png', Buffer.from(result.data, 'base64'));
  console.log('Saved home_lookbook_no_line.png');

  ws.close();
  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
