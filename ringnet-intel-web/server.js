const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURI(urlObj.pathname);

  // JSON API 엔드포인트: /api/news 또는 /api/archive
  if (pathname === '/api/news' || pathname === '/api/archive') {
    const archiveJsPath = path.join(ROOT_DIR, 'data', 'archive.js');
    fs.readFile(archiveJsPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
        return res.end(JSON.stringify({ error: 'Failed to read archive' }));
      }
      try {
        // window.NEWS_ARCHIVE = { ... }; 파싱
        const jsonStr = data.replace(/^window\.NEWS_ARCHIVE\s*=\s*/, '').replace(/;\s*$/, '');
        const parsed = JSON.parse(jsonStr);

        const dateQuery = urlObj.searchParams.get('date');
        const monthQuery = urlObj.searchParams.get('month');

        let result = parsed;
        if (dateQuery) {
          result = { daily: parsed.daily.filter(d => d.date === dateQuery), monthly: [] };
        } else if (monthQuery) {
          result = { daily: [], monthly: parsed.monthly.filter(m => m.month === monthQuery) };
        }

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=60'
        });
        res.end(JSON.stringify(result, null, 2));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ error: 'JSON parse error', details: e.message }));
      }
    });
    return;
  }

  // 정적 파일 서빙
  let reqPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(ROOT_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`📡 링네트 인텔리전스 웹 서버가 실행 중입니다: http://localhost:${PORT}`);
  console.log(`📡 JSON API 엔드포인트: http://localhost:${PORT}/api/news`);
});
