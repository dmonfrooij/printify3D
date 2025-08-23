require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://85.9.219.223:5000', // vervang dit door je frontend URL
}));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Ontvangen verzoek:', req.body);

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.transip.email",
      port: 465, // of 587 als je STARTTLS wil
      secure: true, // true bij poort 465, false bij 587
      auth: {
        user: process.env.TRANSIP_USER, // bv. info@jouwdomein.nl
        pass: process.env.TRANSIP_PASS, // je mailbox wachtwoord
      },
    });

    await transporter.sendMail({
      from: process.env.TRANSIP_USER, // je eigen mailbox bij TransIP
      replyTo: email, // zodat je de afzender kan beantwoorden
      to: process.env.EMAIL_RECEIVER, // je ontvangstadres
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
  console.log(`Server  draait op http://localhost:${PORT}`);
});
