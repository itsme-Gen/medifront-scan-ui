import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ScanId } from "./pages/ScanId";
import { OcrResults } from "./pages/OcrResults";
import { VerificationResults } from "./pages/VerificationResults";
import { MedicalInformation } from "./pages/MedicalInformation";
import { NewPatient } from "./pages/NewPatient";
import { PatientRecords } from "./pages/PatientRecords";
import { SearchPage } from "./pages/Search";
import { Assistant } from "./pages/Assistant";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scan" element={<ScanId />} />
              <Route path="/upload" element={<ScanId />} />
              <Route path="/ocr-results" element={<OcrResults />} />
              <Route path="/verification-results" element={<VerificationResults />} />
              <Route path="/medical-information" element={<MedicalInformation />} />
              <Route path="/new-patient" element={<NewPatient />} />
              <Route path="/patient-records" element={<PatientRecords />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
