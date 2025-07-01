const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const targetURL = "https://script.google.com/macros/s/AKfycbw9M1CMXP2N2geKFNqYx-pmFapFySLwVak5UQXlNHwhFT9_GZaa2sNI1lyEE5MYtgg9pg/exec";

app.post("/", async (req, res) => {
  try {
    const response = await fetch(targetURL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ success: false, error: "حدث خطأ في الخادم الوسيط" });
  }
});

app.listen(PORT, () => console.log(`Proxy on port ${PORT}`));
