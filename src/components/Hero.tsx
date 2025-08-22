import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Van idee tot
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> prototype</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Professionele 3D printing services voor ontwerp en prototyping. 
                Upload uw bestanden  of deel uw ideeën - wij maken het werkelijkheid.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#upload"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Start uw project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Bekijk voorbeelden
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Projecten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24u</div>
                <div className="text-sm text-gray-600">Gemiddelde levertijd</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Tevredenheid</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg"
                alt="3D printed objects and prototypes"
                className="w-full h-full object-cover"
              />
              
              {/* Precision indicator */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-sm font-semibold text-gray-900">Precisie</div>
                <div className="text-xs text-gray-600">vanaf 0.2mm nauwkeurigheid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}