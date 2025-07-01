const express = require('express');
const cors = require('cors');
const axios = require('axios'); // ← هذه هي المكتبة المطلوبة

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const { ip, name, phone, wilaya, quantity } = req.body;

  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbw9M1CMXP2N2geKFNqYx-pmFapFySLwVak5UQXlNHwhFT9_GZaa2sNI1lyEE5MYtgg9pg/exec',
      { ip, name, phone, wilaya, quantity }
    );

    return res.json({ success: true, result: response.data });
  } catch (error) {
    console.error("خطأ أثناء إرسال البيانات إلى Google Script:", error.message);
    return res.status(500).json({ success: false, error: "فشل إرسال البيانات إلى Google Script" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));