import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  User, 
  Calendar, 
  Filter,
  Brain,
  Sparkles,
  Users,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock search results
  const mockResults = [
    {
      id: 1,
      type: 'patient',
      name: 'Maria Santos Dela Cruz',
      details: 'Female, 38 years old, Last visit: Jan 2024',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      match: 95
    },
    {
      id: 2,
      type: 'patient',
      name: 'Juan Carlos Rodriguez',
      details: 'Male, 45 years old, Last visit: Dec 2023',
      conditions: ['Asthma', 'Allergic Rhinitis'],
      match: 87
    },
    {
      id: 3,
      type: 'visit',
      name: 'Emergency Visit - Feb 15, 2024',
      details: 'Patient: Ana Gonzalez • Dr. Sarah Johnson',
      conditions: ['Acute Gastritis'],
      match: 78
    }
  ];

  // Sample natural language queries for demonstration
  const sampleQueries = [
    "Show me all diabetic patients",
    "Who had surgery last year?",
    "Patients with high blood pressure",
    "Find recent emergency visits",
    "Show elderly patients with heart conditions",
    "Patients prescribed Metformin"
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Filter mock results based on search query
      const filtered = mockResults.filter(result => 
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.conditions.some(condition => 
          condition.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      
      setSearchResults(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleSampleQuery = (query: string) => {
    setSearchQuery(query);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'patient': return User;
      case 'visit': return Calendar;
      case 'record': return FileText;
      default: return FileText;
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'text-success';
    if (match >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Smart Search</h1>
        <p className="text-muted-foreground">
          Use natural language to search through patient records and medical data
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard')}
          className="mt-2 text-primary hover:text-primary-foreground hover:bg-primary"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI-Powered Medical Search</span>
          </CardTitle>
          <CardDescription>
            Ask questions in natural language about patients, conditions, visits, or treatments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="e.g., 'Show me all patients with diabetes' or 'Who had surgery in 2023?'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Sample Queries */}
          <div>
            <p className="text-sm font-medium mb-2 flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-primary" />
              Try these sample queries:
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSampleQuery(query)}
                  className="text-xs"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results or Empty State */}
      {searchQuery && searchResults.length === 0 && !isLoading && (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <div className="bg-muted p-6 rounded-full inline-block mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Results Found</h3>
            <p className="text-muted-foreground mb-4">
              No patients or records match your search for "{searchQuery}"
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {sampleQueries.slice(0, 3).map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSampleQuery(query)}
                    className="text-xs"
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results</span>
              <Badge variant="outline">{searchResults.length} found</Badge>
            </CardTitle>
            <CardDescription>
              Results for: "{searchQuery}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result) => {
                const IconComponent = getResultIcon(result.type);
                return (
                  <div 
                    key={result.id}
                    className="border rounded-lg p-4 hover:bg-accent/50 hover:shadow-md cursor-pointer transition-all duration-200"
                    onClick={() => {
                      if (result.type === 'patient') {
                        navigate('/patient-records', { 
                          state: { 
                            patient: { 
                              fullName: result.name,
                              id: `PT-2024-${result.id.toString().padStart(6, '0')}`
                            }
                          }
                        });
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{result.name}</h4>
                          <p className="text-sm text-muted-foreground">{result.details}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getMatchColor(result.match)}`}>
                          {result.match}% match
                        </p>
                      </div>
                    </div>
                    
                    {result.conditions.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {result.conditions.map((condition: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200"
          onClick={() => navigate('/patient-records')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +24 this week
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200"
          onClick={() => navigate('/patient-records?view=records')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medical Records</p>
                <p className="text-2xl font-bold">5,890</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +156 new records
                </p>
              </div>
              <FileText className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200"
          onClick={() => navigate('/patient-records?filter=recent')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Visits</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this month
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Quick Filters</span>
          </CardTitle>
          <CardDescription>
            Common search categories for quick access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
              onClick={() => {
                handleSampleQuery("patients with diabetes");
                setSearchQuery("patients with diabetes");
              }}
            >
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Diabetic Patients</span>
              <span className="text-xs text-muted-foreground mt-1">247 patients</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
              onClick={() => {
                handleSampleQuery("emergency visits");
                setSearchQuery("emergency visits");
              }}
            >
              <Clock className="h-6 w-6 mb-2" />
              <span className="text-sm">Emergency Visits</span>
              <span className="text-xs text-muted-foreground mt-1">89 this month</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
              onClick={() => {
                handleSampleQuery("patients with allergies");
                setSearchQuery("patients with allergies");
              }}
            >
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span className="text-sm">Allergy Alerts</span>
              <span className="text-xs text-muted-foreground mt-1">156 patients</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
              onClick={() => {
                handleSampleQuery("recent lab results");
                setSearchQuery("recent lab results");
              }}
            >
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Lab Results</span>
              <span className="text-xs text-muted-foreground mt-1">342 pending</span>
            </Button>
          </div>
          
          {/* Additional Quick Actions */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-medium mb-3">Advanced Filters</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  handleSampleQuery("patients over 65");
                  setSearchQuery("patients over 65");
                }}
              >
                Senior Patients (65+)
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  handleSampleQuery("patients with chronic conditions");
                  setSearchQuery("patients with chronic conditions");
                }}
              >
                Chronic Conditions
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  handleSampleQuery("upcoming appointments");
                  setSearchQuery("upcoming appointments");
                }}
              >
                Upcoming Appointments
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  handleSampleQuery("overdue checkups");
                  setSearchQuery("overdue checkups");
                }}
              >
                Overdue Checkups
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};