
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle } from 'lucide-react';

interface NutrientRecommendation {
  nutrient: string;
  status: string;
  recommendation: string;
}

interface SuggestedProduct {
  name: string;
  application: string;
  notes: string;
}

interface FertilizerResultDisplayProps {
  results: {
    recommendations: NutrientRecommendation[];
    suggestedProducts: SuggestedProduct[];
  };
  onReset: () => void;
}

const FertilizerResultDisplay = ({ results, onReset }: FertilizerResultDisplayProps) => {
  const { recommendations, suggestedProducts } = results;
  
  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'high':
        return <X className="h-5 w-5 text-red-500" />;
      case 'adequate':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'low':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-secondary bg-opacity-10">
        <CardHeader>
          <CardTitle className="text-center">Fertilizer Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Nutrient Analysis</h3>
            <div className="space-y-4">
              {recommendations.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    {getStatusIcon(item.status)}
                    <h4 className="font-medium ml-2">{item.nutrient}</h4>
                    <span className={`ml-auto text-sm font-medium px-2 py-1 rounded-full ${
                      item.status.toLowerCase() === 'low' ? 'bg-amber-100 text-amber-800' :
                      item.status.toLowerCase() === 'high' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-700">{item.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Products</h3>
            {suggestedProducts.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h4 className="font-medium text-lg">{product.name}</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex">
                    <span className="font-medium w-24">Application:</span>
                    <span>{product.application}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-24">Notes:</span>
                    <span>{product.notes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button onClick={onReset} variant="outline" className="mr-2">
              Start Over
            </Button>
            <Button>
              Save Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FertilizerResultDisplay;
