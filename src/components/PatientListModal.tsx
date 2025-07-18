import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  UserPlus,
  Eye 
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: string;
  time: string;
  department?: string;
  action?: string;
}

interface PatientListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  patients: Patient[];
  type: 'scanned' | 'verified' | 'registered' | 'pending';
}

export const PatientListModal = ({ 
  isOpen, 
  onClose, 
  title, 
  patients, 
  type 
}: PatientListModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      case 'new': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'scanned': return <User className="h-5 w-5" />;
      case 'verified': return <CheckCircle className="h-5 w-5" />;
      case 'registered': return <UserPlus className="h-5 w-5" />;
      case 'pending': return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getIcon()}
            <span>{title}</span>
            <Badge variant="secondary">{patients.length} patients</Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {patients.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No patients found for this category</p>
            </div>
          ) : (
            patients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{patient.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{patient.age} years old</span>
                          <span>{patient.gender}</span>
                          {patient.department && <span>{patient.department}</span>}
                        </div>
                        {patient.action && (
                          <p className="text-sm text-muted-foreground mt-1">{patient.action}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                        <div className="flex items-center space-x-1 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{patient.time}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};