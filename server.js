const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const ip = req.query.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbw9M1CMXP2N2geKFNqYx-pmFapFySLwVak5UQXlNHwhFT9_GZaa2sNI1lyEE5MYtgg9pg/exec?ip=' + encodeURIComponent(ip),
      req.body,
      { headers: { 'Content-Type': 'application/json' } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy server running on port ${PORT}`));

