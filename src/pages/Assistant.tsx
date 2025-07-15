import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Bot, 
  User, 
  Send,
  Sparkles,
  Zap,
  Brain,
  ClipboardList,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your MediScan AI Assistant. I can help you with patient records, medical queries, and administrative tasks. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "List all patients with diabetes",
        "Show recent emergency visits",
        "Find patients due for checkups",
        "Summarize today's appointments"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mock responses based on common queries
  const mockResponses: { [key: string]: string } = {
    'diabetes': "I found 47 patients with Type 2 Diabetes in our system. Recent patients include:\n\n• Maria Santos - Last HbA1c: 7.2% (Jan 2024)\n• Juan Rodriguez - Last visit: Dec 2023\n• Ana Gonzalez - Requires follow-up\n\nWould you like me to show detailed records for any specific patient?",
    'emergency': "Here are the recent emergency visits from the past 7 days:\n\n• Feb 18: Ana Martinez - Chest pain (discharged)\n• Feb 16: Carlos Lopez - Severe allergic reaction\n• Feb 15: Sofia Chen - Acute gastritis\n\nAll patients received appropriate care and follow-up instructions.",
    'appointments': "Today's appointment summary:\n\n📅 **Scheduled: 12 appointments**\n✅ **Completed: 8 appointments**\n⏰ **Upcoming: 4 appointments**\n\nNext appointment: 2:30 PM - John Doe (Routine checkup)",
    'checkups': "Patients due for routine checkups this month:\n\n1. Maria Santos (Diabetes follow-up) - Due: Feb 25\n2. Robert Kim (Hypertension check) - Due: Feb 28\n3. Elena Rodriguez (Annual physical) - Overdue by 5 days\n\nShall I schedule reminders for these patients?",
    'default': "I understand you're asking about medical records. Let me help you with that. Could you be more specific about what information you need? I can assist with:\n\n• Patient searches and records\n• Appointment scheduling\n• Medical summaries\n• Treatment histories\n• Lab results analysis"
  };

  const quickActions = [
    { label: "List diabetic patients", icon: ClipboardList, query: "Show me all patients with diabetes" },
    { label: "Recent emergencies", icon: Zap, query: "What are the recent emergency visits?" },
    { label: "Today's appointments", icon: Calendar, query: "Summarize today's appointments" },
    { label: "Overdue checkups", icon: TrendingUp, query: "Which patients are due for checkups?" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = mockResponses.default;
      
      // Simple keyword matching for demo
      const query = inputMessage.toLowerCase();
      if (query.includes('diabetes') || query.includes('diabetic')) {
        response = mockResponses.diabetes;
      } else if (query.includes('emergency')) {
        response = mockResponses.emergency;
      } else if (query.includes('appointment') || query.includes('today')) {
        response = mockResponses.appointments;
      } else if (query.includes('checkup') || query.includes('due')) {
        response = mockResponses.checkups;
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        suggestions: [
          "Show more details",
          "Export this list",
          "Schedule reminders",
          "Search specific patient"
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
  };

  const handleSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Medical Assistant</h1>
        <p className="text-muted-foreground">
          Chat with our AI assistant for medical record queries and administrative help
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common medical queries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => handleQuickAction(action.query)}
              >
                <action.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Chat Assistant</span>
            </CardTitle>
            <CardDescription>
              Ask questions about patients, appointments, or medical records
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-accent-foreground" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className={`p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                        
                        {/* Suggestions */}
                        {message.suggestions && message.type === 'assistant' && (
                          <div className="flex flex-wrap gap-1">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-6"
                                onClick={() => handleSuggestion(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3">
                      <div className="p-2 rounded-full bg-accent">
                        <Bot className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about patients, appointments, or medical records..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputMessage.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                💡 Try asking: "Show me patients with diabetes" or "What are today's appointments?"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assistant Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Assistant Capabilities</span>
          </CardTitle>
          <CardDescription>
            What our AI assistant can help you with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Patient Management</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Search patient records</li>
                <li>• View medical histories</li>
                <li>• Track appointments</li>
                <li>• Monitor vital signs</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Medical Queries</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Condition-based searches</li>
                <li>• Medication tracking</li>
                <li>• Lab result analysis</li>
                <li>• Treatment summaries</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Administrative Tasks</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Appointment scheduling</li>
                <li>• Report generation</li>
                <li>• System analytics</li>
                <li>• Workflow optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};