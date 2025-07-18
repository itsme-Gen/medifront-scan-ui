import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PatientListModal } from '@/components/PatientListModal';
import { 
  Camera, 
  Upload, 
  Users, 
  FileText, 
  Search, 
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Languages
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedModal, setSelectedModal] = useState<{
    isOpen: boolean;
    title: string;
    type: 'scanned' | 'verified' | 'registered' | 'pending';
    patients: any[];
  }>({
    isOpen: false,
    title: '',
    type: 'scanned',
    patients: []
  });

  // Mock patient data for different categories
  const patientsScannedToday = [
    { id: '1', name: 'Maria Santos', age: 28, gender: 'Female', status: 'verified', time: '2:30 PM', department: 'Cardiology', action: 'ID scanned and verified' },
    { id: '2', name: 'John Dela Cruz', age: 45, gender: 'Male', status: 'verified', time: '1:45 PM', department: 'Neurology', action: 'ID scanned successfully' },
    { id: '3', name: 'Ana Rodriguez', age: 32, gender: 'Female', status: 'pending', time: '12:20 PM', department: 'Emergency', action: 'ID scan processing' },
    { id: '4', name: 'Carlos Mendoza', age: 58, gender: 'Male', status: 'verified', time: '11:15 AM', department: 'Orthopedics', action: 'ID verification complete' },
    { id: '5', name: 'Lisa Chen', age: 24, gender: 'Female', status: 'failed', time: '10:30 AM', department: 'Pediatrics', action: 'ID scan failed - retry needed' },
  ];

  const recordsVerified = [
    { id: '1', name: 'Maria Santos', age: 28, gender: 'Female', status: 'verified', time: '2:30 PM', department: 'Cardiology', action: 'Medical history verified' },
    { id: '2', name: 'John Dela Cruz', age: 45, gender: 'Male', status: 'verified', time: '1:45 PM', department: 'Neurology', action: 'Insurance information confirmed' },
    { id: '3', name: 'Carlos Mendoza', age: 58, gender: 'Male', status: 'verified', time: '11:15 AM', department: 'Orthopedics', action: 'Lab results validated' },
  ];

  const newRegistrations = [
    { id: '1', name: 'Sofia Reyes', age: 19, gender: 'Female', status: 'new', time: '3:15 PM', department: 'General Medicine', action: 'First-time patient registration' },
    { id: '2', name: 'Miguel Torres', age: 67, gender: 'Male', status: 'new', time: '2:00 PM', department: 'Geriatrics', action: 'Emergency registration' },
    { id: '3', name: 'Carmen Luna', age: 41, gender: 'Female', status: 'new', time: '12:45 PM', department: 'Oncology', action: 'Referral registration' },
  ];

  const pendingReviews = [
    { id: '1', name: 'Roberto Silva', age: 52, gender: 'Male', status: 'pending', time: '4:00 PM', department: 'Surgery', action: 'Pre-op clearance pending' },
    { id: '2', name: 'Elena Vasquez', age: 36, gender: 'Female', status: 'pending', time: '3:30 PM', department: 'Radiology', action: 'Insurance verification needed' },
  ];

  const openModal = (type: 'scanned' | 'verified' | 'registered' | 'pending') => {
    let patients, title;
    
    switch (type) {
      case 'scanned':
        patients = patientsScannedToday;
        title = 'Patients Scanned Today';
        break;
      case 'verified':
        patients = recordsVerified;
        title = 'Records Verified';
        break;
      case 'registered':
        patients = newRegistrations;
        title = 'New Registrations';
        break;
      case 'pending':
        patients = pendingReviews;
        title = 'Pending Reviews';
        break;
    }

    setSelectedModal({
      isOpen: true,
      title,
      type,
      patients
    });
  };

  const stats = [
    { title: 'Patients Scanned Today', value: '127', icon: Users, trend: '+12%', action: () => openModal('scanned') },
    { title: 'Records Verified', value: '98', icon: CheckCircle, trend: '+8%', action: () => openModal('verified') },
    { title: 'New Registrations', value: '15', icon: UserPlus, trend: '+25%', action: () => openModal('registered') },
    { title: 'Pending Reviews', value: '8', icon: Clock, trend: '-3%', action: () => openModal('pending') },
  ];

  const quickActions = [
    {
      title: 'Scan Patient ID',
      description: 'Use camera to scan patient identification',
      icon: Camera,
      action: () => navigate('/scan'),
      color: 'bg-primary',
    },
    {
      title: 'Upload ID Image',
      description: 'Upload an existing patient ID image',
      icon: Upload,
      action: () => navigate('/upload'),
      color: 'bg-success',
    },
    {
      title: 'Search Patients',
      description: 'Find patients using natural language',
      icon: Search,
      action: () => navigate('/search'),
      color: 'bg-accent',
    },
    {
      title: 'AI Assistant',
      description: 'Chat with medical record assistant',
      icon: MessageSquare,
      action: () => navigate('/assistant'),
      color: 'bg-warning',
    },
  ];

  const recentActivity = [
    { patient: 'Maria Santos', action: 'ID Verified', time: '5 min ago', status: 'success' },
    { patient: 'John Dela Cruz', action: 'New Registration', time: '12 min ago', status: 'success' },
    { patient: 'Ana Rodriguez', action: 'OCR Processing', time: '18 min ago', status: 'pending' },
    { patient: 'Carlos Mendoza', action: 'Record Updated', time: '25 min ago', status: 'success' },
    { patient: 'Lisa Chen', action: 'Verification Failed', time: '32 min ago', status: 'error' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your medical verification system today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
            <Languages className="h-4 w-4 mr-2" />
            EN / TL
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card 
            key={stat.title} 
            className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200"
            onClick={stat.action}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${
                    stat.trend.startsWith('+') ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.trend} from yesterday
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card 
              key={action.title} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className={`${action.color} text-white p-3 rounded-lg inline-block mb-4`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest patient verification activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                    <div>
                      <p className="font-medium">{activity.patient}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>OCR Processing</span>
              <Badge variant="default">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Database Connection</span>
              <Badge variant="default">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>AI Assistant</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Camera Access</span>
              <Badge variant="secondary">Available</Badge>
            </div>
            <div className="mt-4 p-4 bg-accent/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">System Performance: Excellent</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All services running optimally
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List Modal */}
      <PatientListModal
        isOpen={selectedModal.isOpen}
        onClose={() => setSelectedModal(prev => ({ ...prev, isOpen: false }))}
        title={selectedModal.title}
        patients={selectedModal.patients}
        type={selectedModal.type}
      />
    </div>
  );
};