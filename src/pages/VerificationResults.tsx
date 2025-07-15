import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  User, 
  Calendar, 
  Phone, 
  MapPin,
  FileText,
  Plus,
  Eye,
  History,
  AlertTriangle
} from 'lucide-react';

export const VerificationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { patientData, isNewPatient } = location.state || {};

  // Mock existing patient data for matched case
  const existingPatient = !isNewPatient ? {
    id: 'PT-2024-001234',
    registrationDate: '2023-08-15',
    lastVisit: '2024-01-10',
    totalVisits: 12,
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin', 'Shellfish'],
    bloodType: 'O+',
    emergencyContact: 'Juan Dela Cruz (Spouse) - 09171234567',
    insurance: 'PhilHealth - Active',
    status: 'Active Patient'
  } : null;

  const handleViewRecords = () => {
    navigate('/patient-records', { 
      state: { 
        patient: { ...patientData, ...existingPatient }
      }
    });
  };

  const handleNewRegistration = () => {
    navigate('/new-patient', { 
      state: { 
        initialData: patientData 
      }
    });
  };

  if (!patientData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No Patient Data Found</h1>
        <p className="text-muted-foreground mb-6">
          No patient data was found. Please start the verification process again.
        </p>
        <Button onClick={() => navigate('/scan')}>
          Start New Scan
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verification Results</h1>
        <p className="text-muted-foreground">
          Patient record search completed
        </p>
      </div>

      {/* Match Status */}
      <Card className={isNewPatient ? 'border-warning' : 'border-success'}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${
              isNewPatient ? 'bg-warning/10' : 'bg-success/10'
            }`}>
              {isNewPatient ? (
                <XCircle className="h-8 w-8 text-warning" />
              ) : (
                <CheckCircle className="h-8 w-8 text-success" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">
                {isNewPatient ? 'No Match Found' : 'Patient Record Found'}
              </h2>
              <p className="text-muted-foreground">
                {isNewPatient 
                  ? 'This patient is not in our database. Registration required.' 
                  : 'Existing patient record has been located and verified.'
                }
              </p>
            </div>
            <Badge variant={isNewPatient ? 'outline' : 'default'}>
              {isNewPatient ? 'New Patient' : 'Existing Patient'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanned Information */}
        <Card>
          <CardHeader>
            <CardTitle>Scanned Information</CardTitle>
            <CardDescription>Data extracted from the ID document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{patientData.fullName}</p>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{patientData.idNumber}</p>
                  <p className="text-sm text-muted-foreground">ID Number</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{patientData.birthDate}</p>
                  <p className="text-sm text-muted-foreground">Birth Date</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{patientData.address}</p>
                  <p className="text-sm text-muted-foreground">Address</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Status */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isNewPatient ? 'Registration Required' : 'Patient Summary'}
            </CardTitle>
            <CardDescription>
              {isNewPatient 
                ? 'Complete registration for new patient'
                : 'Overview of existing patient record'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isNewPatient ? (
              <div className="space-y-4">
                <div className="bg-warning/10 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="font-medium">New Patient Registration</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This patient is not found in our system. Please proceed with new patient registration.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Next Steps:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Complete medical history form</li>
                    <li>• Verify insurance information</li>
                    <li>• Set up emergency contacts</li>
                    <li>• Schedule initial consultation</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-success/10 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="font-medium">Patient Verified</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Patient record successfully matched and verified.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Patient ID:</span>
                    <span className="text-sm font-medium">{existingPatient?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge variant="default">{existingPatient?.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Visits:</span>
                    <span className="text-sm font-medium">{existingPatient?.totalVisits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Visit:</span>
                    <span className="text-sm font-medium">{existingPatient?.lastVisit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Insurance:</span>
                    <span className="text-sm font-medium">{existingPatient?.insurance}</span>
                  </div>
                </div>

                {existingPatient?.conditions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Active Conditions:</p>
                    <div className="flex flex-wrap gap-1">
                      {existingPatient.conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isNewPatient ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/scan')}
                >
                  Scan Another ID
                </Button>
                <Button
                  onClick={handleNewRegistration}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Register New Patient</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/scan')}
                >
                  Scan Another ID
                </Button>
                <Button
                  onClick={handleViewRecords}
                  className="flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Medical Records</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/patient-history', { state: { patient: patientData } })}
                >
                  <History className="h-4 w-4 mr-2" />
                  Visit History
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};