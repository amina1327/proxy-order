const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw9M1CMXP2N2geKFNqYx-pmFapFySLwVak5UQXlNHwhFT9_GZaa2sNI1lyEE5MYtgg9pg/exec";

app.post('/', async (req, res) => {
  try {
    const ip = req.query.ip || "Unknown";
    const payload = req.body;

    const response = await fetch(`${GOOGLE_SCRIPT_URL}?ip=${ip}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ success: false, error: "حدث خطأ في الخادم الوسيط" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
