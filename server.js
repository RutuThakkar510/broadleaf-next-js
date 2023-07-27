// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { default: authMiddleware } = require("@/server/middleware/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Apply the custom server-side middleware before rendering the page
    authMiddleware(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
