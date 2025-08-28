require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware (moet altijd vóór de routes komen)
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
    port: 465, // gebruik 587 bij STARTTLS
    secure: true, // true bij poort 465, false bij 587
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
app.post(['/send-email', '/api/send-email'], async (req, res) => {
  console.log(`POST ${req.originalUrl} ontvangen`);
  const { name, email, subject, message } = req.body;
  console.log('Body:', req.body);

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: 'info@printify3d.nl',
      replyTo: email,
      to: 'info@printify3d.nl',
      subject: `Nieuw bericht: ${subject}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`,
    });

    res.status(200).json({ success: true, message: 'E-mail verzonden!' });
  } catch (error) {
    console.error('Fout bij verzenden e-mail:', error);
    console.error('Stacktrace:', error.stack);
    res.status(500).json({ success: false, message: 'Fout bij verzenden e-mail.' });
  }
});

// Project submission endpoint
app.post(['/submit-project', '/api/submit-project'], async (req, res) => {
  console.log(`POST ${req.originalUrl} ontvangen`);
  const {
    name, email, projectType, material, quantity,
    description, budget, timeline, files
  } = req.body;
  console.log('Body:', req.body);

  try {
    const transporter = createTransporter();

    // Email naar Printify3D
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
${files && files.length > 0
  ? files.map(f => `- ${f.name} (${f.size})`).join('\n')
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
    });

    // Bevestiging naar klant
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
    console.error('Stacktrace:', error.stack);
    res.status(500).json({ success: false, message: 'Fout bij verzenden project.' });
  }
});

// Catch-all voor niet-bestaande routes (Express 5 fix)
app.use((req, res) => {
  console.log(`Route niet gevonden: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} niet gevonden`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server draait op http://localhost:${PORT}`);
  console.log('Beschikbare routes:');
  console.log('- GET  /');
  console.log('- POST /send-email');
  console.log('- POST /submit-project');
});
