
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

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
import CompanyView from "@/pages/investor/CompanyView";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="capital-rise-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company" element={<CompanyPortal />} />
            <Route path="/company/create-offer" element={<CreateOffer />} />
            <Route path="/investor" element={<InvestorPortal />} />
            <Route path="/investor/portfolio" element={<Portfolio />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/offer/:id" element={<OfferDetails />} />
            <Route path="/company/:id" element={<CompanyView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
