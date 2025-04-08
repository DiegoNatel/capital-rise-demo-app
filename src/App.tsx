
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import HomePage from "@/pages/home/HomePage";
import Dashboard from "@/pages/dashboard/Dashboard";
import CompanyPortal from "@/pages/company/CompanyPortal";
import InvestorPortal from "@/pages/investor/InvestorPortal";
import Marketplace from "@/pages/marketplace/Marketplace";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import CreateOffer from "@/pages/company/CreateOffer";
import OfferDetails from "@/pages/investor/OfferDetails";
import Portfolio from "@/pages/investor/Portfolio";
import CompanyProfile from "@/pages/investor/CompanyProfile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Landing route component that redirects authenticated users to marketplace
const LandingRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/marketplace" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <LandingRoute>
          <HomePage />
        </LandingRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/company" element={
        <ProtectedRoute>
          <CompanyPortal />
        </ProtectedRoute>
      } />
      <Route path="/company/create-offer" element={
        <ProtectedRoute>
          <CreateOffer />
        </ProtectedRoute>
      } />
      <Route path="/investor" element={
        <ProtectedRoute>
          <InvestorPortal />
        </ProtectedRoute>
      } />
      <Route path="/investor/portfolio" element={
        <ProtectedRoute>
          <Portfolio />
        </ProtectedRoute>
      } />
      <Route path="/marketplace" element={
        <ProtectedRoute>
          <Marketplace />
        </ProtectedRoute>
      } />
      <Route path="/offer/:id" element={
        <ProtectedRoute>
          <OfferDetails />
        </ProtectedRoute>
      } />
      <Route path="/company/:id" element={
        <ProtectedRoute>
          <CompanyProfile />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="capital-rise-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
