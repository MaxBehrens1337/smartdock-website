import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, PAGES_BASE } from './build.mjs';

const args = process.argv.slice(2);
if (args.some(arg => arg !== '--pages')) throw new Error('Aufruf: node tools/serve.mjs [--pages]');
const pages = args.includes('--pages');
const base = pages ? PAGES_BASE : '';
const root = path.resolve(ROOT, pages ? '_site' : 'dist');
await stat(path.join(root, 'index.html')).catch(() => { throw new Error('Zuerst npm run ' + (pages ? 'build:pages' : 'build') + ' ausführen.'); });
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf' };
const server = createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end('Lokale Vorschau: kein Formularversand.'); return; }
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (base && pathname !== base && !pathname.startsWith(base + '/')) { res.writeHead(404); res.end(); return; }
    pathname = pathname.slice(base.length);
    if (pathname.includes('\\') || pathname.includes('\0')) { res.writeHead(400); res.end(); return; }
    let target = path.resolve(root, '.' + (pathname || '/'));
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    const info = await stat(target);
    if (info.isDirectory()) target = path.join(target, 'index.html');
    const bytes = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Content-Length': bytes.length });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch (error) {
    res.writeHead(error instanceof URIError ? 400 : error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500);
    res.end('Datei nicht verfügbar.');
  }
});
const port = Number(process.env.SMARTDOCK_PORT || (pages ? 4174 : 4173));
server.listen(port, '127.0.0.1', () => console.log(`SMARTDOCK Vorschau: http://127.0.0.1:${server.address().port}${base}/`));
