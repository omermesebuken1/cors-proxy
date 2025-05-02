const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());
app.options('/proxy', cors());

app.get("/proxy", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL param");
  res.setHeader('Access-Control-Allow-Origin', '*');

  request({ url, encoding: null }).on("error", (err) => {
    res.status(500).send("Request error");
  }).pipe(res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`CORS proxy running on http://localhost:${PORT}`);
});