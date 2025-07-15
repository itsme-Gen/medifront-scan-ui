import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertCircle,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const ScanId = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock camera capture
  const capturePhoto = () => {
    // Simulate camera capture
    const mockImageData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
    setCapturedImage(mockImageData);
    toast({
      title: "Photo captured",
      description: "Patient ID photo captured successfully",
    });
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        toast({
          title: "File uploaded",
          description: "Patient ID image uploaded successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock OCR processing
  const processImage = () => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing steps
    const steps = [
      { step: 'Analyzing image...', progress: 20 },
      { step: 'Detecting text regions...', progress: 40 },
      { step: 'Extracting text data...', progress: 60 },
      { step: 'Validating information...', progress: 80 },
      { step: 'Complete!', progress: 100 },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setTimeout(() => {
          navigate('/ocr-results', { 
            state: { 
              imageData: capturedImage,
              extractedData: {
                fullName: 'MARIA SANTOS DELA CRUZ',
                idNumber: 'ID-2024-001234',
                birthDate: '1985-03-15',
                address: '123 Rizal St., Makati City',
                bloodType: 'O+',
                emergencyContact: 'Juan Dela Cruz (09171234567)'
              }
            }
          });
        }, 1000);
      }
    }, 800);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Scan Patient ID</h1>
        <p className="text-muted-foreground">
          Capture or upload a patient identification document for verification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera/Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Capture Photo</span>
            </CardTitle>
            <CardDescription>
              Use your device camera or upload an existing image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!capturedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
                <div className="bg-muted p-6 rounded-full inline-block">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">No image captured yet</p>
                  <p className="text-sm text-muted-foreground">
                    Choose an option below to get started
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={capturedImage} 
                    alt="Captured ID" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-success">
                  <Check className="h-4 w-4" />
                  <span>Image captured successfully</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={capturePhoto}
                className="flex-1"
                disabled={isProcessing}
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
              />
              
              <Button 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
                disabled={isProcessing}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>

            {capturedImage && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={retakePhoto}
                className="w-full"
                disabled={isProcessing}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Photo
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Processing Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>OCR Processing</span>
            </CardTitle>
            <CardDescription>
              Extract text data from the captured image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!capturedImage ? (
              <div className="text-center py-8 space-y-3">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium text-muted-foreground">No image to process</p>
                  <p className="text-sm text-muted-foreground">
                    Capture or upload an ID image first
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {isProcessing ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing image...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-muted-foreground text-center">
                      Please wait while we extract text from your image
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="bg-success/10 p-4 rounded-lg">
                      <Check className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="font-medium">Ready to process</p>
                      <p className="text-sm text-muted-foreground">
                        Click below to extract text from the ID
                      </p>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={processImage}
                  disabled={!capturedImage || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Start OCR Processing'}
                </Button>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-accent/50 rounded-lg">
              <h4 className="font-medium mb-2">Tips for best results:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure good lighting on the ID</li>
                <li>• Keep the ID flat and straight</li>
                <li>• Avoid shadows and reflections</li>
                <li>• Make sure all text is clearly visible</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};