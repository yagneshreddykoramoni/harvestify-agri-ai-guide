
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Droplet, Bug } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/ui/feature-card';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white bg-opacity-80 p-8 md:p-12 rounded-lg max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Harvestify</h1>
              <p className="text-xl md:text-2xl mb-8">Your AI-Powered Agricultural Assistant</p>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Make data-driven decisions for your farm with our AI-powered recommendations for crops, fertilizers, and disease detection.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/crop">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Crop Recommendation"
                description="Get personalized crop suggestions based on soil composition and environmental factors to maximize yield and sustainability."
                icon={<Leaf className="h-6 w-6" />}
                linkTo="/crop"
              />
              <FeatureCard
                title="Fertilizer Suggestion"
                description="Receive tailored fertilizer recommendations based on soil nutrient levels and crop requirements for optimal growth."
                icon={<Droplet className="h-6 w-6" />}
                linkTo="/fertilizer"
              />
              <FeatureCard
                title="Disease Detection"
                description="Upload images of plant leaves to identify diseases and get treatment recommendations to protect your crops."
                icon={<Bug className="h-6 w-6" />}
                linkTo="/disease"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Input Your Data</h3>
                <p className="text-gray-600">Enter soil information, location details, or upload plant images.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-gray-600">Our ML models process your data and generate personalized insights.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Get Recommendations</h3>
                <p className="text-gray-600">Receive actionable suggestions tailored to your specific needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Optimize Your Farm?</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Start making data-driven decisions for better yields and sustainable farming practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg" className="bg-white text-secondary hover:bg-gray-100">
                <Link to="/crop">Crop Recommendation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-secondary-foreground/10">
                <Link to="/fertilizer">Fertilizer Suggestion</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-secondary-foreground/10">
                <Link to="/disease">Disease Detection</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
