const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

app.get("/proxy", (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(400).json({ error: "No URL provided" });
    return;
  }

  const proxied = request(url);
  proxied.on("response", function (response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers["content-type"] || "audio/mpeg");
  });

  proxied.on("error", function (err) {
    res.status(500).json({ error: "Proxy request failed", details: err.message });
  });

  proxied.pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CORS proxy running on http://localhost:${PORT}`);
});