require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Multer setup
const upload = multer();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://localhost:5173',
    'http://localhost:4173',
    'http://localhost:465',
    'https://printify3d.nl'
  ],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper: mail transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.transip.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.TRANSIP_USER,
      pass: process.env.TRANSIP_PASS,
    },
  });
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Printify3D API is running', status: 'OK' });
});

// Contact form endpoint
app.post(['/send-email', '/api/send-email'], upload.single('attachment'), async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: 'info@printify3d.nl',
      replyTo: email,
      to: 'd.monfrooij@gmail.com',
      subject: `Nieuw bericht: ${subject}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`,
      attachments: req.file ? [{ filename: req.file.originalname, content: req.file.buffer }] : [],
    });

    res.status(200).json({ success: true, message: 'E-mail verzonden!' });
  } catch (error) {
    console.error('Fout bij verzenden e-mail:', error);
    res.status(500).json({ success: false, message: 'Fout bij verzenden e-mail.' });
  }
});

// Project submission endpoint
app.post(['/submit-project', '/api/submit-project'], upload.array('attachment'), async (req, res) => {
  const {
    name, email, projectType, material, quantity,
    description, budget, timeline
  } = req.body;

  try {
    const transporter = createTransporter();

    const emailContent = `
NIEUW 3D PRINTING PROJECT
========================

CONTACTGEGEVENS:
Naam: ${name}
E-mail: ${email}

PROJECTDETAILS:
Type: ${projectType}
Materiaal: ${material}
Aantal: ${quantity}
Timeline: ${timeline}
Budget: ${budget || 'Niet opgegeven'}

BESCHRIJVING:
${description}

BESTANDEN:
${req.files && req.files.length > 0
      ? req.files.map(f => `- ${f.originalname} (${f.size} bytes)`).join('\n')
      : 'Geen bestanden geüpload'}

---
Dit bericht is automatisch gegenereerd via de Printify3D website.
`;

    await transporter.sendMail({
      from: 'info@printify3d.nl',
      replyTo: email,
      to: 'd.monfrooij@gmail.com',
      subject: `Nieuw 3D Printing Project - ${name}`,
      text: emailContent,
      attachments: req.files ? req.files.map(f => ({
        filename: f.originalname,
        content: f.buffer
      })) : [],
    });

    const confirmationContent = `
Beste ${name},

Bedankt voor uw projectaanvraag bij Printify3D!

We hebben uw aanvraag ontvangen en zullen binnen 2 uur contact met u opnemen met een offerte.

VOORBEELD VAN UW AANVRAAG:
- Project type: ${projectType}
- Materiaal: ${material}
- Aantal: ${quantity}
- Timeline: ${timeline}

Heeft u nog vragen? Neem gerust contact met ons op via info@printify3d.nl of +31 (0)6 154 030 80.

Met vriendelijke groet,
Het Printify3D team

---
Printify3D - Van idee tot prototype
info@printify3d.nl
`;

    await transporter.sendMail({
      from: 'info@printify3d.nl',
      to: email,
      subject: 'Bevestiging - Uw 3D Printing Project',
      text: confirmationContent,
    });

    res.status(200).json({
      success: true,
      message: 'Project verzonden! U ontvangt binnen 2 uur een offerte.',
      referenceNumber: `PR${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    });
  } catch (error) {
    console.error('Fout bij verzenden project:', error);
    res.status(500).json({ success: false, message: 'Fout bij verzenden project.' });
  }
});

// Catch-all voor niet-bestaande routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} niet gevonden`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server draait op http://localhost:${PORT}`);
});