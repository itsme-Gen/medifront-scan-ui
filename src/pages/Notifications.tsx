import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, Clock, X } from 'lucide-react';

export const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'New patient registration pending',
      message: 'Maria Santos requires verification',
      type: 'warning',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      title: 'OCR processing completed',
      message: 'John Dela Cruz ID verification successful',
      type: 'success',
      time: '15 min ago',
      unread: true
    },
    {
      id: 3,
      title: 'System maintenance scheduled',
      message: 'Maintenance window: Tonight 2-4 AM',
      type: 'info',
      time: '2 hours ago',
      unread: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'info': return <Bell className="h-4 w-4 text-primary" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`cursor-pointer hover:shadow-md transition-shadow ${notification.unread ? 'border-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {notification.unread && (
                    <Badge variant="secondary" className="text-xs">New</Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};