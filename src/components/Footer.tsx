import React from 'react';
import { Printer, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
                <Printer className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Print3D Pro</h3>
                <p className="text-sm text-gray-400">Design & Prototyping</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Uw specialist voor professionele 3D printing services. 
              Van concept tot prototype - wij maken uw ideeën werkelijkheid.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">Rapid Prototyping</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Design Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Functionele Onderdelen</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Materialenadvies</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Kwaliteitscontrole</a></li>
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Materialen</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>PLA - Biodegradable</li>
              <li>ABS - Hittebestendig</li>
              <li>PETG - Transparant</li>
              <li>TPU - Flexibel</li>
              <li>Speciale materialen</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>info@print3dpro.nl</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+31 (0)20 123 4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Innovation Street 123<br />1234 AB Amsterdam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Print3D Pro. Alle rechten voorbehouden.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-white transition-colors">Voorwaarden</a>
              <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}