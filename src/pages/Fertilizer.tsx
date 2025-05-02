
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FertilizerRecommendationForm from '@/components/fertilizer/FertilizerRecommendationForm';

const Fertilizer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Fertilizer Recommendation</h1>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
          Get tailored fertilizer suggestions based on your soil composition and target crop. 
          Our system analyzes nutrient levels to recommend precise fertilizer formulations for optimal growth.
        </p>
        <FertilizerRecommendationForm />
      </div>
      <Footer />
    </div>
  );
};

export default Fertilizer;
