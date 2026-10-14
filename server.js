/**
 * Servidor estático mínimo para Nexo Digital (sin dependencias).
 * Útil si despliegas el repositorio como "Web Service" en Render.
 * Render asigna el puerto mediante la variable de entorno PORT.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  let filePath = path.join(ROOT, urlPath);
  // Evitar salir del directorio raíz
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("403 Forbidden");
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) filePath = path.join(filePath, "index.html");

    fs.readFile(filePath, (err2, data) => {
      if (err2) {
        // Fallback: servir la página 404 (o el index)
        const notFound = path.join(ROOT, "index.html");
        fs.readFile(notFound, (e3, d3) => {
          if (e3) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("404 Not Found");
          }
          res.writeHead(200, { "Content-Type": MIME[".html"] });
          res.end(d3);
        });
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400"
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Nexo Digital sirviéndose en el puerto ${PORT}`);
});
