import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Algemene vraag',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);
    if (file) {
      formDataToSend.append('attachment', file);
    }

    try {
      const res = await fetch(`https://printify3d.nl/api/send-email`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
        alert('Bericht verzonden! We nemen spoedig contact met u op.');
        setFormData({
          name: '',
          email: '',
          subject: 'Algemene vraag',
          message: '',
        });
        setFile(null);
      } else {
        alert('Er ging iets mis bij het verzenden. Probeer het opnieuw.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Er ging iets mis bij het verzenden. Probeer het opnieuw of neem direct contact op via info@printify3d.nl');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-lg text-gray-600">Vragen over uw project? We helpen graag!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* ... contact info zoals eerder ... */}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Stuur een bericht</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Naam *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Uw volledige naam"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="uw@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Onderwerp</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Algemene vraag</option>
                <option>Offerte aanvraag</option>
                <option>Technische ondersteuning</option>
                <option>Materialenadvies</option>
                <option>Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bericht *</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Vertel ons over uw project of vraag..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bijlage (optioneel)</label>
              <input
                type="file"
                name="attachment"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Verstuur Bericht
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}