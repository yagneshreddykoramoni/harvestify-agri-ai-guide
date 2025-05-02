
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DiseaseDetectionForm from '@/components/disease/DiseaseDetectionForm';

const Disease = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Plant Disease Detection</h1>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
          Upload images of your plant leaves to identify diseases and receive treatment recommendations.
          Our AI model can detect various plant diseases and provide solutions to protect your crops.
        </p>
        <DiseaseDetectionForm />
      </div>
      <Footer />
    </div>
  );
};

export default Disease;
