import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Registration form state
  const [regData, setRegData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    licenseNumber: '',
    phone: '',
    hospitalId: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to MediScan",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (regData.password !== regData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "Passwords do not match",
      });
      return;
    }

    if (!regData.firstName || !regData.lastName || !regData.email || !regData.password || !regData.role) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields",
      });
      return;
    }

    setIsRegistering(true);

    try {
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Account created successfully!",
        description: `Welcome ${regData.firstName}! You can now log in with your credentials.`,
      });
      
      // Clear form and switch to login tab
      setRegData({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        department: '',
        licenseNumber: '',
        phone: '',
        hospitalId: ''
      });
      setActiveTab('login');
      setEmail(regData.email); // Pre-fill email on login form
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const quickLogins = [
    { email: 'sarah@hospital.com', role: 'Doctor', name: 'Dr. Sarah Johnson' },
    { email: 'maria@hospital.com', role: 'Nurse', name: 'Nurse Maria Garcia' },
    { email: 'admin@hospital.com', role: 'Admin', name: 'Admin John Smith' },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div 
            className="bg-primary p-4 rounded-2xl inline-block mb-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/dashboard')}
          >
            <Stethoscope className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 
            className="text-3xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate('/dashboard')}
          >
            MediScan
          </h1>
          <p className="text-muted-foreground">Medical Record Verification System</p>
        </div>

        {/* Login/Register Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5" />
              <span>Access MediScan</span>
            </CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Create Account</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={regData.firstName}
                          onChange={(e) => setRegData(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          placeholder="Middle name"
                          value={regData.middleName}
                          onChange={(e) => setRegData(prev => ({ ...prev, middleName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          value={regData.lastName}
                          onChange={(e) => setRegData(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Professional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Select value={regData.role} onValueChange={(value) => setRegData(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="nurse">Nurse</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="technician">Technician</SelectItem>
                            <SelectItem value="radiologist">Radiologist</SelectItem>
                            <SelectItem value="pharmacist">Pharmacist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          placeholder="e.g., Cardiology, Emergency"
                          value={regData.department}
                          onChange={(e) => setRegData(prev => ({ ...prev, department: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">License Number</Label>
                        <Input
                          id="licenseNumber"
                          placeholder="Professional license number"
                          value={regData.licenseNumber}
                          onChange={(e) => setRegData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospitalId">Hospital ID</Label>
                        <Input
                          id="hospitalId"
                          placeholder="Employee/Hospital ID"
                          value={regData.hospitalId}
                          onChange={(e) => setRegData(prev => ({ ...prev, hospitalId: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="regEmail">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="regEmail"
                            type="email"
                            placeholder="Professional email"
                            value={regData.email}
                            onChange={(e) => setRegData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Contact number"
                          value={regData.phone}
                          onChange={(e) => setRegData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Security</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="regPassword">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="regPassword"
                            type="password"
                            placeholder="Create password"
                            value={regData.password}
                            onChange={(e) => setRegData(prev => ({ ...prev, password: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            value={regData.confirmPassword}
                            onChange={(e) => setRegData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isRegistering}
                  >
                    {isRegistering ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Login Demo - Only show when on login tab */}
        {activeTab === 'login' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Demo Accounts</CardTitle>
              <CardDescription className="text-xs">
                Click to login with demo credentials (password: demo123)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickLogins.map((account) => (
                <Button
                  key={account.email}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('demo123');
                  }}
                >
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-xs text-muted-foreground">{account.role}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};