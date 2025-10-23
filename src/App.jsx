import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ToyDetails from "./pages/ToyDetails";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import AllToys from "./pages/AllToys";

const App = () => (
  <>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/all-toys" element={<AllToys />} />
            <Route path="/toy/:id" element={<ToyDetails />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  </>
);

export default App;
