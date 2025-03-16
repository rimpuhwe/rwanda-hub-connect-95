
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import JobApplicationPage from "./pages/JobApplicationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserAccountPage from "./pages/UserAccountPage";
import NotFound from "./pages/NotFound";
import { PageLayout } from "./components/layout/PageLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Wrap all non-home pages with PageLayout for consistent padding */}
          <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
          <Route path="/services/:type" element={<PageLayout><ServicesPage /></PageLayout>} />
          <Route path="/services/:type/:id" element={<PageLayout><ServiceDetailPage /></PageLayout>} />
          <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
          <Route path="/blog/:id" element={<PageLayout><BlogDetailPage /></PageLayout>} />
          <Route path="/jobs" element={<PageLayout><JobsPage /></PageLayout>} />
          <Route path="/jobs/:id" element={<PageLayout><JobDetailPage /></PageLayout>} />
          <Route path="/jobs/:id/apply" element={<PageLayout><JobApplicationPage /></PageLayout>} />
          <Route path="/login" element={<PageLayout><LoginPage /></PageLayout>} />
          <Route path="/register" element={<PageLayout><RegisterPage /></PageLayout>} />
          <Route path="/account" element={<PageLayout><UserAccountPage /></PageLayout>} />
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
