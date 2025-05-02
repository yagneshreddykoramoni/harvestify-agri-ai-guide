
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface Treatment {
  type: string;
  action: string;
  frequency: string;
}

interface Disease {
  name: string;
  description: string;
  treatments: Treatment[];
  preventionTips: string[];
}

interface DiseaseResultDisplayProps {
  results: {
    crop: string;
    status: string;
    confidence: number;
    disease: Disease | null;
  };
  originalImage: string | null;
  onReset: () => void;
}

const DiseaseResultDisplay = ({ results, originalImage, onReset }: DiseaseResultDisplayProps) => {
  const { crop, status, confidence, disease } = results;
  
  return (
    <div className="space-y-6">
      <Card className={status === "Healthy" ? "bg-green-50" : "bg-red-50"}>
        <CardHeader>
          <CardTitle className="text-center">Plant Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              {originalImage && (
                <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                  <img 
                    src={originalImage} 
                    alt="Analyzed leaf" 
                    className="w-full h-auto max-h-[300px] object-contain rounded" 
                  />
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-semibold">Analysis Summary</h3>
                  {status === "Healthy" ? (
                    <div className="ml-auto bg-green-100 p-1 px-3 rounded-full flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-800">Healthy</span>
                    </div>
                  ) : (
                    <div className="ml-auto bg-red-100 p-1 px-3 rounded-full flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-sm font-medium text-red-800">Diseased</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Crop Type:</span>
                      <span className="font-medium">{crop}</span>
                    </div>
                  </div>
                  
                  {disease && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Disease:</span>
                        <span className="font-medium text-red-700">{disease.name}</span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence:</span>
                      <span className="font-medium">{Math.round(confidence * 100)}%</span>
                    </div>
                    <Progress value={confidence * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {disease && (
            <>
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-2">Disease Information</h3>
                <p className="text-gray-700">{disease.description}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-3">Recommended Treatments</h3>
                <div className="space-y-4">
                  {disease.treatments.map((treatment, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                          treatment.type.toLowerCase() === 'organic' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {treatment.type}
                        </span>
                      </div>
                      <p className="mt-1 font-medium">{treatment.action}</p>
                      <p className="text-sm text-gray-600">{treatment.frequency}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-3">Prevention Tips</h3>
                <ul className="space-y-2">
                  {disease.preventionTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-accent/20 p-1 rounded-full mr-2 mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          
          <Separator className="mb-6" />
          
          <div className="flex justify-center">
            <Button onClick={onReset} variant="outline" className="mr-2">
              Check Another Plant
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

export default DiseaseResultDisplay;
