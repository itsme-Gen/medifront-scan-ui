import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  Heart,
  AlertTriangle,
  Shield,
  CheckCircle,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NewPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { initialData } = location.state || {};
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Basic Information
    fullName: initialData?.fullName || '',
    idNumber: initialData?.idNumber || '',
    birthDate: initialData?.birthDate || '',
    gender: '',
    bloodType: initialData?.bloodType || '',
    
    // Contact Information
    address: initialData?.address || '',
    phone: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: initialData?.emergencyContact?.split(' - ')[1] || '',
    emergencyContactRelation: '',
    
    // Medical Information
    allergies: '',
    currentMedications: '',
    chronicConditions: '',
    previousSurgeries: '',
    
    // Insurance & Consent
    insuranceProvider: '',
    insuranceNumber: '',
    consentTreatment: false,
    consentDataSharing: false,
    consentMarketing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate patient registration
    toast({
      title: "Registration successful!",
      description: "New patient has been registered in the system.",
    });
    
    // Navigate to patient records
    navigate('/patient-records', {
      state: {
        patient: {
          ...formData,
          id: `PT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(6, '0')}`,
          registrationDate: new Date().toISOString().split('T')[0],
          status: 'Active Patient'
        }
      }
    });
  };

  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Basic Information',
    'Contact Details',
    'Medical History',
    'Insurance & Consent'
  ];

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="idNumber">ID Number *</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => handleInputChange('idNumber', e.target.value)}
            placeholder="Enter ID number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date *</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select value={formData.bloodType} onValueChange={(value) => handleInputChange('bloodType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter complete address"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="09XX-XXX-XXXX"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-accent/50 rounded-lg">
        <h4 className="font-medium mb-3">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Name *</Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
              placeholder="Emergency contact name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Phone *</Label>
            <Input
              id="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactRelation">Relationship *</Label>
            <Select value={formData.emergencyContactRelation} onValueChange={(value) => handleInputChange('emergencyContactRelation', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="allergies">Known Allergies</Label>
        <Textarea
          id="allergies"
          value={formData.allergies}
          onChange={(e) => handleInputChange('allergies', e.target.value)}
          placeholder="List any known allergies (medications, food, environmental)"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentMedications">Current Medications</Label>
        <Textarea
          id="currentMedications"
          value={formData.currentMedications}
          onChange={(e) => handleInputChange('currentMedications', e.target.value)}
          placeholder="List current medications and dosages"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="chronicConditions">Chronic Conditions</Label>
        <Textarea
          id="chronicConditions"
          value={formData.chronicConditions}
          onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
          placeholder="List any chronic medical conditions"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
        <Textarea
          id="previousSurgeries"
          value={formData.previousSurgeries}
          onChange={(e) => handleInputChange('previousSurgeries', e.target.value)}
          placeholder="List any previous surgeries and dates"
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Insurance Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="insuranceProvider">Insurance Provider</Label>
            <Select value={formData.insuranceProvider} onValueChange={(value) => handleInputChange('insuranceProvider', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="philhealth">PhilHealth</SelectItem>
                <SelectItem value="maxicare">Maxicare</SelectItem>
                <SelectItem value="medicard">Medicard</SelectItem>
                <SelectItem value="hmi">Health Maintenance Inc.</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="insuranceNumber">Insurance Number</Label>
            <Input
              id="insuranceNumber"
              value={formData.insuranceNumber}
              onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
              placeholder="Enter insurance number"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Consent & Privacy</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consentTreatment"
              checked={formData.consentTreatment}
              onCheckedChange={(checked) => handleInputChange('consentTreatment', checked as boolean)}
            />
            <Label htmlFor="consentTreatment" className="text-sm">
              I consent to medical treatment and procedures *
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consentDataSharing"
              checked={formData.consentDataSharing}
              onCheckedChange={(checked) => handleInputChange('consentDataSharing', checked as boolean)}
            />
            <Label htmlFor="consentDataSharing" className="text-sm">
              I consent to sharing medical data with authorized healthcare providers
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consentMarketing"
              checked={formData.consentMarketing}
              onCheckedChange={(checked) => handleInputChange('consentMarketing', checked as boolean)}
            />
            <Label htmlFor="consentMarketing" className="text-sm">
              I consent to receiving health-related communications and reminders
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.idNumber && formData.birthDate && formData.gender;
      case 2:
        return formData.address && formData.phone && formData.emergencyContactName && 
               formData.emergencyContactPhone && formData.emergencyContactRelation;
      case 3:
        return true; // Medical history is optional
      case 4:
        return formData.consentTreatment;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">New Patient Registration</h1>
        <p className="text-muted-foreground">
          Complete the registration form to add a new patient to the system
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/verification-results')}
          className="mt-2 text-primary hover:text-primary-foreground hover:bg-primary"
        >
          ← Back to Verification
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {currentStep === 1 && <User className="h-5 w-5" />}
            {currentStep === 2 && <MapPin className="h-5 w-5" />}
            {currentStep === 3 && <Heart className="h-5 w-5" />}
            {currentStep === 4 && <Shield className="h-5 w-5" />}
            <span>{stepTitles[currentStep - 1]}</span>
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter the patient's basic personal information"}
            {currentStep === 2 && "Provide contact details and emergency contact"}
            {currentStep === 3 && "Add medical history and health information"}
            {currentStep === 4 && "Complete insurance details and consent forms"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Register Patient</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};