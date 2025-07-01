const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { name, phone, wilaya, quantity, ip } = req.body;

  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbw9M1CMXP2N2geKFNqYx-pmFapFySLwVak5UQXlNHwhFT9_GZaa2sNI1lyEE5MYtgg9pg/exec?ip=${ip}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, wilaya, quantity }),
    });

    const result = await response.json();
    res.json(result); // ✅ إعادة الرد كما هو للمتصفح
  } catch (error) {
    console.error("❌ خطأ في الخادم الوسيط:", error);
    res.status(500).json({ success: false, error: "حدث خطأ في الخادم الوسيط" });
  }
});

app.listen(3000, () => console.log("✅ Proxy server running on port 3000"));
