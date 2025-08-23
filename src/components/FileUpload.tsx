import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    email: '',
    projectType: 'prototype',
    material: 'PLA',
    quantity: '1',
    description: '',
    budget: '',
    timeline: 'standard'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare file information for email (since we can't actually upload files via email)
    const fileInfo = files.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    }));

    const projectData = {
      ...projectDetails,
      files: fileInfo
    };

    // Send to backend
    console.log('Versturen naar:', `${import.meta.env.VITE_BACKEND_URL}/submit-project`);
    console.log('Project data:', projectData);
    
    fetch(`${import.meta.env.VITE_BACKEND_URL}/submit-project`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(projectData),
    })
    .then(res => res.json())
    .then(data => {
      console.log('Response data:', data);
      if (data.success) {
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFiles([]);
          setProjectDetails({
            name: '',
            email: '',
            projectType: 'prototype',
            material: 'PLA',
            quantity: '1',
            description: '',
            budget: '',
            timeline: 'standard'
          });
        }, 5000);
      } else {
        alert('Er ging iets mis bij het verzenden. Probeer het opnieuw.');
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
      alert('Er ging iets mis bij het verzenden. Probeer het opnieuw of neem direct contact op via info@printify3d.nl');
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isSubmitted) {
    return (
      <section id="upload" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-xl">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Project Ontvangen!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Bedankt voor uw project. We nemen binnen 2 uur contact met u op met een offerte.
            </p>
            <div className="bg-green-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-green-800">
                Referentienummer: #PR{Math.random().toString(36).substr(2, 6).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upload" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Start Uw Project
          </h2>
          <p className="text-lg text-gray-600">
            Upload uw bestanden of beschrijf uw idee - wij helpen u verder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Naam *
              </label>
              <input
                type="text"
                required
                value={projectDetails.name}
                onChange={(e) => setProjectDetails(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Uw volledige naam"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                required
                value={projectDetails.email}
                onChange={(e) => setProjectDetails(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="uw.email@example.com"
              />
            </div>
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Bestanden Uploaden
            </label>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Sleep bestanden hierheen of klik om te selecteren
              </p>
              <p className="text-sm text-gray-600">
                STL, OBJ, STEP, CAD bestanden (max 50MB per bestand)
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".stl,.obj,.step,.stp,.dwg,.dxf,.iges,.igs"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Geüploade bestanden:</h4>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <select
                value={projectDetails.projectType}
                onChange={(e) => setProjectDetails(prev => ({ ...prev, projectType: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="prototype">Prototype</option>
                <option value="functional">Functioneel onderdeel</option>
                <option value="miniature">Miniatuur/Model</option>
                <option value="art">Kunst/Decoratie</option>
                <option value="other">Anders</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materiaal Voorkeur
              </label>
              <select
                value={projectDetails.material}
                onChange={(e) => setProjectDetails(prev => ({ ...prev, material: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PLA">PLA (Standaard)</option>
                <option value="ABS">ABS (Sterker)</option>
                <option value="PETG">PETG (Transparant)</option>
                <option value="TPU">TPU (Flexibel)</option>
                <option value="advise">Advies gewenst</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aantal
              </label>
              <input
                type="number"
                min="1"
                value={projectDetails.quantity}
                onChange={(e) => setProjectDetails(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeline
              </label>
              <select
                value={projectDetails.timeline}
                onChange={(e) => setProjectDetails(prev => ({ ...prev, timeline: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rush">Rush (24u) - +50%</option>
                <option value="fast">Snel (48u) - +25%</option>
                <option value="standard">Standaard (3-5 dagen)</option>
                <option value="economy">Economisch (1-2 weken) - -15%</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projectbeschrijving
            </label>
            <textarea
              value={projectDetails.description}
              onChange={(e) => setProjectDetails(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Beschrijf uw idee, speciale wensen, afmetingen, functionaliteit..."
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Indicatie (optioneel)
            </label>
            <select
              value={projectDetails.budget}
              onChange={(e) => setProjectDetails(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecteer budget range</option>
              <option value="under-50">Onder €50</option>
              <option value="50-100">€50 - €100</option>
              <option value="100-250">€100 - €250</option>
              <option value="250-500">€250 - €500</option>
              <option value="over-500">Boven €500</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Project Versturen</span>
            </button>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Wat gebeurt er nu?</p>
              <p>We controleren uw bestanden en sturen binnen 2 uur een offerte. Geen bestanden? Geen probleem - we helpen u met het ontwerp!</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}