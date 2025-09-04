import React from 'react';
import { Clock, Layers, Zap, CheckCircle } from 'lucide-react';
import deco from './assets/images/deco.png';
import eindkap from './assets/images/EindkapKunstofDak.png';

export default function Examples() {
  const projects = [
    {
      title: 'Prototype Behuizing',
      description: 'Functionele behuizing voor elektronisch apparaat met perfecte pasvorm',
      material: 'ABS',
      time: '2 dagen',
      precision: '0.4mm',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
      category: 'Prototype'
    },
    {
      title: 'Mechanisch Tandwiel',
      description: 'Precisie tandwiel voor bewegende mechanica met sterke eigenschappen',
      material: 'PETG',
      time: '1 dag',
      precision: '0.4mm',
      image: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg',
      category: 'Functioneel'
    },
    {
      title: 'Architectuur Model',
      description: 'Gedetailleerd schaalmodel van gebouw met fijne details',
      material: 'PLA',
      time: '3 dagen',
      precision: '0.4mm',
      image: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg',
      category: 'Model'
    },
    {
      title: 'Flexibele Koppeling',
      description: 'Buigzame verbindingsstuk met rubber-achtige eigenschappen',
      material: 'ASA',
      time: '1 dag',
      precision: '0.4mm',
      image: 'https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg',
      category: 'Functioneel'
    },
    {
      title: 'Decoratief Object',
      description: 'Vevangen lampenkap met decoratiestuk',
      material: 'PLA',
      time: '2 dagen',
      precision: '0.4mm',
      image: '/images/deco.png',
      category: 'Decoratie'
    },
    {
      title: 'Vervangingsonderdeel',
      description: 'Op maat gemaakt onderdeel ter vervanging van missend origineel',
      material: 'PETG-CF',
      time: '1 dag',
      precision: '0.4mm',
      image: '/images/EindkapKunstofDak.png',
      category: 'Onderdeel'
    }
  ];

  const categories = ['Alle', 'Prototype', 'Functioneel', 'Model', 'Flexibel', 'Decoratie', 'Onderdeel'];
  const [activeCategory, setActiveCategory] = React.useState('Alle');

  const filteredProjects = activeCategory === 'Alle' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="examples" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Onze Voorbeelden
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek wat mogelijk is met professionele 3D printing. Van prototypes tot functionele onderdelen.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-xs font-medium text-gray-700">{project.category}</span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

                {/* Project Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Layers className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-600">Materiaal:</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.material}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">Levertijd:</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.time}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-600">Precisie:</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.precision}</span>
                  </div>
                </div>

                {/* Quality Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Kwaliteit gegarandeerd</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Klaar om uw project te starten?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Heeft u een idee of bestand dat u wilt laten printen? Upload uw bestanden of neem contact op voor advies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#upload"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Project Uploaden
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Contact Opnemen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}