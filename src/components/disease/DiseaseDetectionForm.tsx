
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Image } from 'lucide-react';
import DiseaseResultDisplay from './DiseaseResultDisplay';

interface DiseaseFormData {
  cropType: string;
  image: File | null;
}

// Mock list of crops for disease detection
const cropOptions = [
  "Tomato", "Potato", "Apple", "Corn", "Grape", "Bell Pepper",
  "Cherry", "Rice", "Wheat", "Cotton"
];

// Mock API function - In a real app, this would connect to a backend
const analyzeLeafImage = async (formData: DiseaseFormData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // For demo purposes, return mock data
  return {
    crop: formData.cropType,
    status: "Diseased",
    confidence: 0.92,
    disease: {
      name: "Late Blight",
      description: "Late blight is a serious disease caused by Phytophthora infestans. It affects leaves, stems and tubers, typically during wet weather.",
      treatments: [
        {
          type: "Organic",
          action: "Apply copper-based fungicides as a preventive measure",
          frequency: "Every 7-10 days during wet conditions"
        },
        {
          type: "Chemical",
          action: "Apply chlorothalonil or mancozeb-based fungicides",
          frequency: "Every 5-7 days after first symptoms appear"
        }
      ],
      preventionTips: [
        "Ensure good air circulation around plants",
        "Avoid overhead watering methods",
        "Remove and destroy infected plant parts",
        "Choose resistant varieties when possible",
        "Practice crop rotation"
      ]
    }
  };
};

const DiseaseDetectionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<DiseaseFormData>({
    cropType: '',
    image: null
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's an image
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      
      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cropType) {
      toast({
        title: "Missing information",
        description: "Please select a crop type",
        variant: "destructive"
      });
      return;
    }

    if (!formData.image) {
      toast({
        title: "Missing image",
        description: "Please upload a leaf image",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeLeafImage(formData);
      setResults(data);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your leaf image and have results for you.",
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
      cropType: '',
      image: null
    });
    setImageSrc(null);
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!results ? (
        <Card>
          <CardHeader>
            <CardTitle>Plant Disease Detection</CardTitle>
            <CardDescription>Upload a leaf image to identify potential disease</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
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
                <Label>Leaf Image</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                    imageSrc ? 'border-primary' : 'border-gray-300'
                  }`}
                  onClick={triggerFileInput}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  
                  {imageSrc ? (
                    <div className="space-y-4">
                      <div className="mx-auto w-full max-w-[300px]">
                        <img 
                          src={imageSrc} 
                          alt="Uploaded leaf" 
                          className="mx-auto max-h-[200px] object-contain rounded-md"
                        />
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerFileInput();
                          }}
                        >
                          <Image className="mr-2 h-4 w-4" />
                          Change Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Click to upload a leaf image</p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Analyzing Image...' : 'Analyze Leaf'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <DiseaseResultDisplay results={results} originalImage={imageSrc} onReset={resetForm} />
      )}
    </div>
  );
};

export default DiseaseDetectionForm;
