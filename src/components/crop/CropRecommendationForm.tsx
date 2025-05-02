
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import CropResultDisplay from './CropResultDisplay';

interface CropFormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
  city: string;
  state: string;
}

// Mock API function - In a real app, this would connect to a backend
const fetchCropRecommendation = async (formData: CropFormData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, return mock data
  return {
    recommendedCrops: [
      { name: "Rice", confidence: 0.88 },
      { name: "Wheat", confidence: 0.75 },
      { name: "Maize", confidence: 0.65 }
    ],
    soilReport: {
      quality: "Good",
      phStatus: "Slightly Alkaline",
      nutrientStatus: "Adequate nitrogen, low phosphorus"
    }
  };
};

const CropRecommendationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CropFormData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['nitrogen', 'phosphorus', 'potassium', 'ph'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof CropFormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const data = await fetchCropRecommendation(formData);
      setResults(data);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your soil data and have recommendations for you.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to process your request. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
      city: '',
      state: ''
    });
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!results ? (
        <Card>
          <CardHeader>
            <CardTitle>Crop Recommendation</CardTitle>
            <CardDescription>Enter your soil and location details to get crop recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen">Nitrogen (N) *</Label>
                  <Input 
                    id="nitrogen" 
                    name="nitrogen" 
                    type="number" 
                    placeholder="e.g., 40" 
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">Value in kg/ha</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phosphorus">Phosphorus (P) *</Label>
                  <Input 
                    id="phosphorus" 
                    name="phosphorus" 
                    type="number" 
                    placeholder="e.g., 50" 
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">Value in kg/ha</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="potassium">Potassium (K) *</Label>
                  <Input 
                    id="potassium" 
                    name="potassium" 
                    type="number" 
                    placeholder="e.g., 60" 
                    value={formData.potassium}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">Value in kg/ha</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">Soil pH *</Label>
                  <Input 
                    id="ph" 
                    name="ph" 
                    type="number" 
                    step="0.1" 
                    placeholder="e.g., 6.5" 
                    value={formData.ph}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">pH scale (0-14)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rainfall">Rainfall</Label>
                  <Input 
                    id="rainfall" 
                    name="rainfall" 
                    type="number" 
                    placeholder="e.g., 200" 
                    value={formData.rainfall}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">Value in mm</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    placeholder="e.g., Bangalore" 
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">For weather data (optional)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    placeholder="e.g., Karnataka" 
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">For weather data (optional)</p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Analyzing...' : 'Get Recommendations'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <CropResultDisplay results={results} onReset={resetForm} />
      )}
    </div>
  );
};

export default CropRecommendationForm;
