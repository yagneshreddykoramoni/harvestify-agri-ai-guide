
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CropResult {
  name: string;
  confidence: number;
}

interface SoilReport {
  quality: string;
  phStatus: string;
  nutrientStatus: string;
}

interface CropResultDisplayProps {
  results: {
    recommendedCrops: CropResult[];
    soilReport: SoilReport;
  };
  onReset: () => void;
}

const CropResultDisplay = ({ results, onReset }: CropResultDisplayProps) => {
  const { recommendedCrops, soilReport } = results;
  
  return (
    <div className="space-y-6">
      <Card className="bg-green-50">
        <CardHeader>
          <CardTitle className="text-center">Crop Recommendation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Recommended Crops</h3>
            <div className="space-y-4">
              {recommendedCrops.map((crop, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{crop.name}</h4>
                    <span className="text-sm font-medium">{Math.round(crop.confidence * 100)}% match</span>
                  </div>
                  <Progress value={crop.confidence * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-3">Soil Analysis</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Soil Quality:</span>
                <span className="font-medium">{soilReport.quality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">pH Status:</span>
                <span className="font-medium">{soilReport.phStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nutrient Status:</span>
                <span className="font-medium">{soilReport.nutrientStatus}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button onClick={onReset} variant="outline" className="mr-2">
              Start Over
            </Button>
            <Button>
              Save Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropResultDisplay;
