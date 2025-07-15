import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const breadcrumbMap: Record<string, string> = {
    dashboard: 'Dashboard',
    scan: 'Scan ID',
    upload: 'Upload ID',
    'ocr-results': 'OCR Results',
    'verification-results': 'Verification Results',
    'new-patient': 'New Patient',
    'patient-records': 'Patient Records',
    search: 'Search',
    assistant: 'AI Assistant',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings'
  };

  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="h-auto p-1 hover:text-foreground"
        onClick={() => navigate('/dashboard')}
      >
        <Home className="h-4 w-4" />
      </Button>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <React.Fragment key={name}>
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">{displayName}</span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 hover:text-foreground"
                onClick={() => navigate(routeTo)}
              >
                {displayName}
              </Button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};