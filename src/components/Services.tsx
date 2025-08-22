import React from 'react';
import { Layers, Zap, Shield, Clock, Palette, Cog } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Layers,
      title: 'Rapid Prototyping',
      description: 'Snelle prototypes voor productvalidatie en concept testing',
      features: ['24-48u levertijd', 'Verschillende materialen', 'Hoge precisie']
    },
    {
      icon: Palette,
      title: 'Design Services',
      description: 'Van idee tot volledig uitgewerkt 3D ontwerp',
      features: ['CAD modeling', 'Design optimalisatie', 'Technische tekeningen']
    },
    {
      icon: Cog,
      title: 'Functionele Onderdelen',
      description: 'Productie van werkende onderdelen en mechanica',
      features: ['Sterke materialen', 'Bewegende delen', 'Assemblage service']
    }
  ];

  const materials = [
    { name: 'PLA', description: 'Gebruiksvriendelijk, biodegradable', color: 'bg-green-500' },
    { name: 'ABS', description: 'Sterk en hittebestendig', color: 'bg-blue-500' },
    { name: 'PETG', description: 'Transparant en chemisch bestendig', color: 'bg-purple-500' },
    { name: 'TPU', description: 'Flexibel rubber-achtig materiaal', color: 'bg-orange-500' }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Onze Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Van concept tot eindproduct - wij bieden complete 3D printing oplossingen voor uw project
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Materials Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Beschikbare Materialen
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 rounded-full ${material.color} mr-3`}></div>
                  <h4 className="font-semibold text-gray-900">{material.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{material.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Ons Proces
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Upload', desc: 'Stuur uw bestanden of idee' },
              { icon: Shield, title: 'Analyse', desc: 'We controleren en optimaliseren' },
              { icon: Clock, title: 'Printen', desc: 'Professioneel 3D printen' },
              { icon: Layers, title: 'Levering', desc: 'Kwaliteitscheck en verzending' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}