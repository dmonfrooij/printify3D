require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'https://printify3d.nl:5000', // of je frontend URL
}));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Ontvangen verzoek:', req.body); // ✅ logging toegevoegd

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nieuw bericht: ${subject}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`,
    });

    res.status(200).json({ success: true, message: 'E-mail verzonden!' });
  } catch (error) {
    console.error('Fout bij verzenden:', error);
    res.status(500).json({ success: false, message: 'Fout bij verzenden.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
