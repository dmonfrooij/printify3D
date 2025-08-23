require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Tijdelijk alle CORS toestaan
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Ontvangen verzoek:', req.body);

  // Mailfunctie tijdelijk uit, zodat server niet crasht
  // Later kun je nodemailer weer activeren
  res.status(200).json({ success: true, message: 'E-mail tijdelijk uitgeschakeld' });
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
