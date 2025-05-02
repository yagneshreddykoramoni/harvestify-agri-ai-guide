
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CropRecommendationForm from '@/components/crop/CropRecommendationForm';

const Crop = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Crop Recommendation</h1>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
          Get personalized crop recommendations based on your soil composition and environmental conditions. 
          Our AI model analyzes your soil nutrients and local climate to suggest the most suitable crops for your land.
        </p>
        <CropRecommendationForm />
      </div>
      <Footer />
    </div>
  );
};

export default Crop;
