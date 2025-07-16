import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Edit3, 
  RotateCcw, 
  Search,
  User,
  Calendar,
  MapPin,
  Phone,
  Droplet
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const OcrResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { imageData, extractedData } = location.state || {};
  
  const [formData, setFormData] = useState({
    fullName: extractedData?.fullName || '',
    idNumber: extractedData?.idNumber || '',
    birthDate: extractedData?.birthDate || '',
    address: extractedData?.address || '',
    bloodType: extractedData?.bloodType || '',
    emergencyContact: extractedData?.emergencyContact || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [confidence, setConfidence] = useState(92); // Mock confidence score

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    // Navigate to verification results
    navigate('/verification-results', { 
      state: { 
        patientData: formData,
        isNewPatient: Math.random() > 0.6 // 40% chance of existing patient
      }
    });
  };

  const handleRetry = () => {
    navigate('/scan');
  };

  const fields = [
    { key: 'fullName', label: 'Full Name', icon: User, required: true },
    { key: 'idNumber', label: 'ID Number', icon: Badge, required: true },
    { key: 'birthDate', label: 'Birth Date', icon: Calendar, required: true },
    { key: 'address', label: 'Address', icon: MapPin, required: false },
    { key: 'bloodType', label: 'Blood Type', icon: Droplet, required: false },
    { key: 'emergencyContact', label: 'Emergency Contact', icon: Phone, required: false }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-destructive';
  };

  if (!extractedData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No OCR Data Found</h1>
        <p className="text-muted-foreground mb-6">
          No extracted data was found. Please scan an ID first.
        </p>
        <Button onClick={() => navigate('/scan')}>
          Go to Scan Page
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">OCR Results</h1>
        <p className="text-muted-foreground">
          Review and edit the extracted information before proceeding
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/scan')}
          className="mt-2 text-primary hover:text-primary-foreground hover:bg-primary"
        >
          ← Back to Scan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Original Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Original Image</CardTitle>
            <CardDescription>Scanned patient ID document</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={imageData} 
                alt="Scanned ID" 
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>OCR Confidence:</span>
                <span className={`font-bold ${getConfidenceColor(confidence)}`}>
                  {confidence}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Processing completed successfully
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extracted Data */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Extracted Information</CardTitle>
                <CardDescription>
                  Verify the accuracy of extracted data
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {isEditing ? 'Done Editing' : 'Edit Fields'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="flex items-center space-x-2">
                    <field.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{field.label}</span>
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id={field.key}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? '' : 'bg-muted'}
                  />
                </div>
              ))}
            </div>

            {/* Confidence Indicators */}
            <div className="mt-6 p-4 bg-accent/50 rounded-lg">
              <h4 className="font-medium mb-3">Field Confidence Scores</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="text-success font-medium">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>ID Number:</span>
                  <span className="text-success font-medium">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Birth Date:</span>
                  <span className="text-success font-medium">89%</span>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="text-warning font-medium">76%</span>
                </div>
                <div className="flex justify-between">
                  <span>Blood Type:</span>
                  <span className="text-success font-medium">92%</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency:</span>
                  <span className="text-warning font-medium">74%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={handleRetry}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Scan Again</span>
            </Button>
            
            <Button
              onClick={handleConfirm}
              className="flex items-center space-x-2"
              disabled={!formData.fullName || !formData.idNumber || !formData.birthDate}
            >
              <Search className="h-4 w-4" />
              <span>Search Records</span>
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            Click "Search Records" to verify against existing patient database
          </p>
        </CardContent>
      </Card>

      {/* Data Quality Alert */}
      {confidence < 80 && (
        <Card className="border-warning">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-warning/10 p-2 rounded-full">
                <X className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="font-medium">Low Confidence Detection</p>
                <p className="text-sm text-muted-foreground">
                  Some fields may need manual verification. Please review carefully before proceeding.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};