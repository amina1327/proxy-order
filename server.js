const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { ip, name, phone, wilaya, quantity } = req.body;

    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbw9M1CMXP2N2geKFNqYx-pmFapFySLwVak5UQXlNHwhFT9_GZaa2sNI1lyEE5MYtgg9pg/exec",
      {
        ip,
        name,
        phone,
        wilaya,
        quantity
      }
    );

    // ✅ الرد بصيغة JSON
    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ success: false, error: "حدث خطأ في الخادم الوسيط" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

