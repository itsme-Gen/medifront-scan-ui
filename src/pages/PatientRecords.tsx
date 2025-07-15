import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  Heart,
  AlertTriangle,
  Pill,
  FileText,
  Stethoscope,
  Activity,
  Clock,
  Edit,
  Plus,
  Download,
  ArrowLeft,
  Share
} from 'lucide-react';

export const PatientRecords = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient } = location.state || {};

  // Mock medical history data
  const medicalHistory = {
    visits: [
      {
        id: 1,
        date: '2024-01-10',
        type: 'Regular Checkup',
        doctor: 'Dr. Sarah Johnson',
        diagnosis: 'Routine follow-up for hypertension',
        notes: 'Blood pressure stable, medication compliance good',
        prescriptions: ['Amlodipine 5mg', 'Lisinopril 10mg']
      },
      {
        id: 2,
        date: '2023-11-15',
        type: 'Emergency Visit',
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Acute gastritis',
        notes: 'Patient experienced severe stomach pain, prescribed antacids',
        prescriptions: ['Omeprazole 20mg', 'Antacid suspension']
      },
      {
        id: 3,
        date: '2023-08-20',
        type: 'Specialist Consultation',
        doctor: 'Dr. Elena Rodriguez',
        diagnosis: 'Diabetes Type 2 initial consultation',
        notes: 'New diagnosis, lifestyle counseling provided',
        prescriptions: ['Metformin 500mg', 'Blood glucose monitor']
      }
    ],
    currentMedications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', startDate: '2023-06-01' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-08-20' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-07-15' }
    ],
    allergies: ['Penicillin', 'Shellfish', 'Latex'],
    vitalSigns: {
      lastUpdated: '2024-01-10',
      bloodPressure: '128/82',
      heartRate: '72',
      temperature: '98.6°F',
      weight: '75kg',
      height: '165cm',
      bmi: '27.5'
    },
    labResults: [
      { test: 'HbA1c', value: '7.2%', date: '2024-01-10', status: 'elevated' },
      { test: 'Cholesterol Total', value: '190 mg/dL', date: '2024-01-10', status: 'normal' },
      { test: 'Blood Glucose', value: '145 mg/dL', date: '2024-01-10', status: 'elevated' },
      { test: 'Creatinine', value: '1.1 mg/dL', date: '2024-01-10', status: 'normal' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'elevated': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal': return 'default';
      case 'elevated': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  if (!patient) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No Patient Data</h1>
        <p className="text-muted-foreground mb-6">
          No patient information was found. Please select a patient first.
        </p>
        <Button onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Interactive Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Patient Records</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share Records
          </Button>
          <Button size="sm" onClick={() => navigate('/new-patient')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patient Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-4 rounded-full">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{patient.fullName}</h1>
                <p className="text-muted-foreground">Patient ID: {patient.id || 'PT-2024-001234'}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Born: {patient.birthDate}
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {patient.bloodType || 'O+'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Info
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Records
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Visit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Records Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{patient.phone || '09171234567'}</p>
                    <p className="text-sm text-muted-foreground">Primary Phone</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{patient.address}</p>
                    <p className="text-sm text-muted-foreground">Home Address</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                  Medical Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium mb-2">Allergies:</p>
                  <div className="flex flex-wrap gap-1">
                    {medicalHistory.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Chronic Conditions:</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Hypertension</Badge>
                    <Badge variant="outline" className="text-xs">Type 2 Diabetes</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Vital Signs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Latest Vital Signs</CardTitle>
                <CardDescription>
                  Updated: {medicalHistory.vitalSigns.lastUpdated}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Blood Pressure</p>
                    <p className="font-medium">{medicalHistory.vitalSigns.bloodPressure}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Heart Rate</p>
                    <p className="font-medium">{medicalHistory.vitalSigns.heartRate} bpm</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Weight</p>
                    <p className="font-medium">{medicalHistory.vitalSigns.weight}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">BMI</p>
                    <p className="font-medium">{medicalHistory.vitalSigns.bmi}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
              <CardDescription>Patient's medical visit records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.visits.map((visit) => (
                  <div key={visit.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Stethoscope className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{visit.type}</h4>
                          <p className="text-sm text-muted-foreground">{visit.date} • {visit.doctor}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Diagnosis:</p>
                      <p className="text-sm text-muted-foreground">{visit.diagnosis}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Notes:</p>
                      <p className="text-sm text-muted-foreground">{visit.notes}</p>
                    </div>
                    {visit.prescriptions.length > 0 && (
                      <div>
                        <p className="font-medium mb-1">Prescriptions:</p>
                        <div className="flex flex-wrap gap-1">
                          {visit.prescriptions.map((prescription, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {prescription}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Active prescriptions and dosages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.currentMedications.map((medication, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-success/10 p-2 rounded-full">
                          <Pill className="h-4 w-4 text-success" />
                        </div>
                        <div>
                          <h4 className="font-medium">{medication.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {medication.dosage} • {medication.frequency}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Started: {medication.startDate}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs Tracking</CardTitle>
              <CardDescription>Patient's vital signs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="font-medium">Blood Pressure</span>
                  </div>
                  <p className="text-2xl font-bold">{medicalHistory.vitalSigns.bloodPressure}</p>
                  <p className="text-sm text-muted-foreground">mmHg</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-destructive" />
                    <span className="font-medium">Heart Rate</span>
                  </div>
                  <p className="text-2xl font-bold">{medicalHistory.vitalSigns.heartRate}</p>
                  <p className="text-sm text-muted-foreground">bpm</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-4 w-4 text-warning" />
                    <span className="font-medium">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold">{medicalHistory.vitalSigns.temperature}</p>
                  <p className="text-sm text-muted-foreground">Fahrenheit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
              <CardDescription>Recent lab tests and values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.labResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{result.test}</h4>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${getStatusColor(result.status)}`}>
                        {result.value}
                      </p>
                      <Badge variant={getStatusBadge(result.status)} className="text-xs">
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};