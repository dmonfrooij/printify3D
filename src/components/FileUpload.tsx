
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Voeg projectgegevens toe
    Object.entries(projectDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Voeg bestanden toe
    files.forEach((file, index) => {
      formData.append('files[]', file);
    });

    try {
      const res = await fetch('/api/submit-project', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
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
            timeline: 'standard',
          });
        }, 5000);
      } else {
        alert('Er ging iets mis bij het verzenden. Probeer het opnieuw.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Er ging iets mis bij het verzenden. Probeer het opnieuw of neem direct contact op via info@printify3d.nl');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // De rest van de component blijft ongewijzigd
}
