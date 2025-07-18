import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Syringe, 
  Pill, 
  Calendar, 
  FileText, 
  MessageSquare,
  Plus,
  X,
  User,
  Save,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MedicalInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { patientData } = location.state || {};
  
  const [medicalData, setMedicalData] = useState({
    medicalHistory: [],
    vaccinations: [],
    medications: [],
    visits: [],
    labResults: [],
    remarks: ''
  });

  const [newEntry, setNewEntry] = useState({
    medicalHistory: { condition: '', date: '', status: 'Active' },
    vaccinations: { vaccine: '', date: '', dose: '', nextDue: '' },
    medications: { name: '', dosage: '', frequency: '', prescribedBy: '' },
    visits: { date: '', doctor: '', purpose: '', notes: '' },
    labResults: { test: '', date: '', result: '', reference: '' }
  });

  const addEntry = (section: string) => {
    const entry = { ...newEntry[section], id: Date.now() };
    setMedicalData(prev => ({
      ...prev,
      [section]: [...prev[section], entry]
    }));
    
    // Reset the form
    setNewEntry(prev => ({
      ...prev,
      [section]: section === 'medicalHistory' 
        ? { condition: '', date: '', status: 'Active' }
        : section === 'vaccinations'
        ? { vaccine: '', date: '', dose: '', nextDue: '' }
        : section === 'medications'
        ? { name: '', dosage: '', frequency: '', prescribedBy: '' }
        : section === 'visits'
        ? { date: '', doctor: '', purpose: '', notes: '' }
        : { test: '', date: '', result: '', reference: '' }
    }));
  };

  const removeEntry = (section: string, id: number) => {
    setMedicalData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleSave = () => {
    toast({
      title: "Medical Information Saved",
      description: "Patient medical information has been successfully saved.",
    });
    navigate('/patient-records', { 
      state: { 
        patientData: { ...patientData, medicalData } 
      }
    });
  };

  if (!patientData) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No Patient Data Found</h1>
        <p className="text-muted-foreground mb-6">
          Please complete the ID scan process first.
        </p>
        <Button onClick={() => navigate('/scan')}>
          Go to Scan Page
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Information</h1>
          <p className="text-muted-foreground">
            Complete patient medical profile for {patientData.fullName}
          </p>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Patient Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Full Name</Label>
              <p className="text-foreground">{patientData.fullName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">ID Number</Label>
              <p className="text-foreground">{patientData.idNumber}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Birth Date</Label>
              <p className="text-foreground">{patientData.birthDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Medical History</span>
          </CardTitle>
          <CardDescription>Add patient's medical conditions and history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Condition"
              value={newEntry.medicalHistory.condition}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                medicalHistory: { ...prev.medicalHistory, condition: e.target.value }
              }))}
            />
            <Input
              type="date"
              value={newEntry.medicalHistory.date}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                medicalHistory: { ...prev.medicalHistory, date: e.target.value }
              }))}
            />
            <Select
              value={newEntry.medicalHistory.status}
              onValueChange={(value) => setNewEntry(prev => ({
                ...prev,
                medicalHistory: { ...prev.medicalHistory, status: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Chronic">Chronic</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => addEntry('medicalHistory')}
              disabled={!newEntry.medicalHistory.condition}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {medicalData.medicalHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{item.condition}</span>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <Badge variant={item.status === 'Active' ? 'destructive' : 'secondary'}>
                    {item.status}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeEntry('medicalHistory', item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vaccinations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Syringe className="h-5 w-5" />
            <span>Vaccinations</span>
          </CardTitle>
          <CardDescription>Track vaccination history and schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Vaccine name"
              value={newEntry.vaccinations.vaccine}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                vaccinations: { ...prev.vaccinations, vaccine: e.target.value }
              }))}
            />
            <Input
              type="date"
              placeholder="Date given"
              value={newEntry.vaccinations.date}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                vaccinations: { ...prev.vaccinations, date: e.target.value }
              }))}
            />
            <Input
              placeholder="Dose"
              value={newEntry.vaccinations.dose}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                vaccinations: { ...prev.vaccinations, dose: e.target.value }
              }))}
            />
            <Input
              type="date"
              placeholder="Next due"
              value={newEntry.vaccinations.nextDue}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                vaccinations: { ...prev.vaccinations, nextDue: e.target.value }
              }))}
            />
            <Button 
              onClick={() => addEntry('vaccinations')}
              disabled={!newEntry.vaccinations.vaccine}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {medicalData.vaccinations.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{item.vaccine}</span>
                  <span className="text-sm text-muted-foreground">Given: {item.date}</span>
                  <span className="text-sm text-muted-foreground">Dose: {item.dose}</span>
                  {item.nextDue && <span className="text-sm text-warning">Next: {item.nextDue}</span>}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeEntry('vaccinations', item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5" />
            <span>Current Medications</span>
          </CardTitle>
          <CardDescription>List of current medications and prescriptions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Medication name"
              value={newEntry.medications.name}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                medications: { ...prev.medications, name: e.target.value }
              }))}
            />
            <Input
              placeholder="Dosage"
              value={newEntry.medications.dosage}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                medications: { ...prev.medications, dosage: e.target.value }
              }))}
            />
            <Input
              placeholder="Frequency"
              value={newEntry.medications.frequency}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                medications: { ...prev.medications, frequency: e.target.value }
              }))}
            />
            <Input
              placeholder="Prescribed by"
              value={newEntry.medications.prescribedBy}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                medications: { ...prev.medications, prescribedBy: e.target.value }
              }))}
            />
            <Button 
              onClick={() => addEntry('medications')}
              disabled={!newEntry.medications.name}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {medicalData.medications.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.dosage}</span>
                  <span className="text-sm text-muted-foreground">{item.frequency}</span>
                  <span className="text-sm text-muted-foreground">by {item.prescribedBy}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeEntry('medications', item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Recent Visits</span>
          </CardTitle>
          <CardDescription>Medical visits and appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              type="date"
              value={newEntry.visits.date}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                visits: { ...prev.visits, date: e.target.value }
              }))}
            />
            <Input
              placeholder="Doctor/Provider"
              value={newEntry.visits.doctor}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                visits: { ...prev.visits, doctor: e.target.value }
              }))}
            />
            <Input
              placeholder="Purpose"
              value={newEntry.visits.purpose}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                visits: { ...prev.visits, purpose: e.target.value }
              }))}
            />
            <Input
              placeholder="Notes"
              value={newEntry.visits.notes}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                visits: { ...prev.visits, notes: e.target.value }
              }))}
            />
            <Button 
              onClick={() => addEntry('visits')}
              disabled={!newEntry.visits.date || !newEntry.visits.doctor}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {medicalData.visits.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <span className="font-medium">{item.doctor}</span>
                  <span className="text-sm">{item.purpose}</span>
                  {item.notes && <span className="text-sm text-muted-foreground">- {item.notes}</span>}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeEntry('visits', item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lab Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Lab Results</span>
          </CardTitle>
          <CardDescription>Laboratory test results and reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Test name"
              value={newEntry.labResults.test}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                labResults: { ...prev.labResults, test: e.target.value }
              }))}
            />
            <Input
              type="date"
              value={newEntry.labResults.date}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                labResults: { ...prev.labResults, date: e.target.value }
              }))}
            />
            <Input
              placeholder="Result"
              value={newEntry.labResults.result}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                labResults: { ...prev.labResults, result: e.target.value }
              }))}
            />
            <Input
              placeholder="Reference range"
              value={newEntry.labResults.reference}
              onChange={(e) => setNewEntry(prev => ({
                ...prev,
                labResults: { ...prev.labResults, reference: e.target.value }
              }))}
            />
            <Button 
              onClick={() => addEntry('labResults')}
              disabled={!newEntry.labResults.test || !newEntry.labResults.result}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {medicalData.labResults.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{item.test}</span>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <span className="text-sm">{item.result}</span>
                  {item.reference && <span className="text-sm text-muted-foreground">({item.reference})</span>}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeEntry('labResults', item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Remarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Remarks & Notes</span>
          </CardTitle>
          <CardDescription>Additional medical notes and observations</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter any additional medical notes, allergies, special conditions, or remarks..."
            value={medicalData.remarks}
            onChange={(e) => setMedicalData(prev => ({ ...prev, remarks: e.target.value }))}
            rows={6}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              size="lg"
              className="flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Medical Information</span>
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            All medical information will be securely saved to the patient's record
          </p>
        </CardContent>
      </Card>
    </div>
  );
};