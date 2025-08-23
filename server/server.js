require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Ontvangen verzoek:', req.body);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.transip.email",   // ✅ correct
      port: 465,
      secure: true,
      auth: {
        user: process.env.TRANSIP_USER,
        pass: process.env.TRANSIP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.TRANSIP_USER,
      replyTo: email,
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server draait op http://0.0.0.0:${PORT}`);
});
