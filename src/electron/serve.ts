import http from "http";
import { readFile, readFileSync } from "fs";
import path from "path";

export let prodServer: http.Server | undefined;

export const Serve = () => {
  if (process.env.VITE_DEV_SERVER_URL) return;
  const mimes = {
    ".ico": "image/x-icon",
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".wav": "audio/wav",
    ".mp3": "audio/mpeg",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
  };

  const buildPath = path.normalize(path.join(__dirname, "../"));
  const indexHtml = readFileSync(path.join(buildPath, "index.html"));
  prodServer = http
    .createServer((req, res) => {
      if (!req.url || !req.url.includes("assets")) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(indexHtml);
        return;
      }

      if (req.url?.indexOf("\0") !== -1) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404: File not found");
        return;
      }

      const assetPaths = req.url.split("assets");
      if (assetPaths.length !== 2) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404: File not found");
        return;
      }

      const asset = assetPaths[1];
      const servePath = path.normalize(path.join(buildPath, "assets", asset));
      readFile(servePath, (err, data) => {
        if (err) {
          console.error(err);
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("404: File not found");
        } else {
          const ext = mimes[path.extname(servePath) as keyof typeof mimes];
          const headers = { "Content-Type": ext || "text/html" };
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    })
    .listen(0);
};
