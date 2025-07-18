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
  Share,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  Filter,
  Search
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
      { test: 'HbA1c', value: '7.2%', date: '2024-01-10', status: 'elevated', trend: 'up', priority: 'high' },
      { test: 'Cholesterol Total', value: '190 mg/dL', date: '2024-01-10', status: 'normal', trend: 'stable', priority: 'low' },
      { test: 'Blood Glucose', value: '145 mg/dL', date: '2024-01-10', status: 'elevated', trend: 'up', priority: 'medium' },
      { test: 'Creatinine', value: '1.1 mg/dL', date: '2024-01-10', status: 'normal', trend: 'down', priority: 'low' },
      { test: 'White Blood Cell Count', value: '8.5 K/uL', date: '2024-01-10', status: 'normal', trend: 'stable', priority: 'low' },
      { test: 'Hemoglobin', value: '13.2 g/dL', date: '2024-01-10', status: 'normal', trend: 'stable', priority: 'low' }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'elevated': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'critical': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-destructive" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-success" />;
      case 'stable': return <div className="h-3 w-3 bg-muted-foreground rounded-full" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted';
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
            className="hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Patient Records</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hover:bg-accent transition-colors">
            <Eye className="h-4 w-4 mr-2" />
            View Timeline
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-accent transition-colors">
            <Share className="h-4 w-4 mr-2" />
            Share Records
          </Button>
          <Button size="sm" onClick={() => navigate('/new-patient')} className="hover:scale-105 transition-transform">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patient Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-success bg-success/5 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Status</p>
                <p className="text-lg font-semibold text-success">Stable</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-warning bg-warning/5 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-lg font-semibold text-warning">Moderate</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-primary bg-primary/5 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
                <p className="text-lg font-semibold">{medicalHistory.visits.length}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-accent bg-accent/5 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Meds</p>
                <p className="text-lg font-semibold">{medicalHistory.currentMedications.length}</p>
              </div>
              <Pill className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Header */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-4 rounded-full shadow-lg">
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
                  <Badge variant="secondary" className="ml-2">Active Patient</Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="hover:bg-accent transition-colors">
                <Edit className="h-4 w-4 mr-2" />
                Edit Info
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-accent transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Records
              </Button>
              <Button size="sm" className="hover:scale-105 transition-transform">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>Patient's medical visit records</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.visits.map((visit, index) => (
                  <div key={visit.id} className={`border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow ${
                    visit.type === 'Emergency Visit' ? 'border-l-4 border-l-destructive bg-destructive/5' :
                    visit.type === 'Specialist Consultation' ? 'border-l-4 border-l-warning bg-warning/5' :
                    'border-l-4 border-l-success bg-success/5'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          visit.type === 'Emergency Visit' ? 'bg-destructive/10' :
                          visit.type === 'Specialist Consultation' ? 'bg-warning/10' :
                          'bg-success/10'
                        }`}>
                          <Stethoscope className={`h-4 w-4 ${
                            visit.type === 'Emergency Visit' ? 'text-destructive' :
                            visit.type === 'Specialist Consultation' ? 'text-warning' :
                            'text-success'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{visit.type}</h4>
                            <Badge variant={
                              visit.type === 'Emergency Visit' ? 'destructive' :
                              visit.type === 'Specialist Consultation' ? 'secondary' :
                              'default'
                            } className="text-xs">
                              {visit.type === 'Emergency Visit' ? 'Urgent' :
                               visit.type === 'Specialist Consultation' ? 'Specialist' :
                               'Routine'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{visit.date} • {visit.doctor}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-50 hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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
                            <Badge key={index} variant="outline" className="text-xs hover:bg-accent transition-colors cursor-pointer">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Active prescriptions and dosages</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="hover:bg-accent transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.currentMedications.map((medication, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow border-l-4 border-l-success bg-success/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-success/10 p-2 rounded-full">
                          <Pill className="h-4 w-4 text-success" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{medication.name}</h4>
                            <Badge variant="default" className="text-xs">Active</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {medication.dosage} • {medication.frequency}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Started: {medication.startDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="text-sm font-medium text-success">On Schedule</p>
                          <p className="text-xs text-muted-foreground">Next: Tomorrow 8:00 AM</p>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-50 hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Laboratory Results</CardTitle>
                <CardDescription>Recent lab tests and values</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter by Status
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Order Tests
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.labResults.map((result, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(result.priority)}`}>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{result.test}</h4>
                          <Badge variant={getStatusBadge(result.status)} className="text-xs">
                            {result.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{result.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <p className={`font-bold ${getStatusColor(result.status)}`}>
                            {result.value}
                          </p>
                          {getTrendIcon(result.trend)}
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">{result.priority} Priority</p>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-50 hover:opacity-100">
                        <Eye className="h-4 w-4" />
                      </Button>
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