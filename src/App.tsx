import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NosBox from "./pages/NosBox";
import OrderPage from "./pages/OrderPage";
import GiftOrderPage from "./pages/GiftOrderPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import CGVPage from "./pages/CGVPage";
import PrivacyPage from "./pages/PrivacyPage";
import LegalPage from "./pages/LegalPage";
import RefundPage from "./pages/RefundPage";
import DeliveryPage from "./pages/DeliveryPage";
import AdminQuizResponses from "./pages/AdminQuizResponses";
import AdminReferrals from "./pages/AdminReferrals";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ShopifyTest from "./pages/ShopifyTest";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nos-box" element={<NosBox />}>
            <Route index element={<Navigate to="/nos-box/commande" replace />} />
            <Route path="commande" element={<OrderPage />} />
            <Route path="cadeau" element={<GiftOrderPage />} />
          </Route>
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cgv" element={<CGVPage />} />
          <Route path="/confidentialite" element={<PrivacyPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/remboursement" element={<RefundPage />} />
          <Route path="/livraison" element={<DeliveryPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/quiz-responses" element={<AdminQuizResponses />} />
          <Route path="/admin/referrals" element={<AdminReferrals />} />
          <Route path="/shopify-test" element={<ShopifyTest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
