
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import FertilizerResultDisplay from './FertilizerResultDisplay';

interface FertilizerFormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  cropType: string;
  soilType: string;
  ph: string;
}

// Mock list of crops
const cropOptions = [
  "Rice", "Wheat", "Maize", "Cotton", "Sugarcane", "Tomato", 
  "Potato", "Chili", "Onion", "Garlic", "Soybean"
];

// Mock list of soil types
const soilOptions = [
  "Clay", "Sandy", "Loamy", "Black", "Red", "Alluvial", "Silt"
];

// Mock API function - In a real app, this would connect to a backend
const fetchFertilizerRecommendation = async (formData: FertilizerFormData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, return mock data
  return {
    recommendations: [
      {
        nutrient: "Nitrogen",
        status: "Low",
        recommendation: "Add Urea fertilizer at 100 kg/ha"
      },
      {
        nutrient: "Phosphorus",
        status: "Adequate",
        recommendation: "No additional phosphorus needed"
      },
      {
        nutrient: "Potassium",
        status: "High",
        recommendation: "Reduce potassium application in next season"
      }
    ],
    suggestedProducts: [
      {
        name: "Urea 46-0-0",
        application: "Apply 50 kg/acre before sowing",
        notes: "Split application recommended"
      },
      {
        name: "Organic Compost",
        application: "Apply 2 tonnes/acre",
        notes: "Improves soil structure"
      }
    ]
  };
};

const FertilizerRecommendationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FertilizerFormData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    cropType: '',
    soilType: '',
    ph: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['nitrogen', 'phosphorus', 'potassium', 'cropType'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FertilizerFormData]);
    
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
      const data = await fetchFertilizerRecommendation(formData);
      setResults(data);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your soil data and have fertilizer recommendations for you.",
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
      cropType: '',
      soilType: '',
      ph: ''
    });
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!results ? (
        <Card>
          <CardHeader>
            <CardTitle>Fertilizer Recommendation</CardTitle>
            <CardDescription>Enter your soil data and crop type to get fertilizer suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type *</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('cropType', value)}
                    value={formData.cropType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map((crop) => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('soilType', value)}
                    value={formData.soilType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilOptions.map((soil) => (
                        <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">Soil pH</Label>
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
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Analyzing...' : 'Get Fertilizer Recommendations'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <FertilizerResultDisplay results={results} onReset={resetForm} />
      )}
    </div>
  );
};

export default FertilizerRecommendationForm;
