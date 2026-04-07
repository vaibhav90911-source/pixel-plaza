import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index.tsx";
import StorePage from "./pages/StorePage.tsx";
import RanksPage from "./pages/RanksPage.tsx";
import CratesPage from "./pages/CratesPage.tsx";
import RulesPage from "./pages/RulesPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/ranks" element={<RanksPage />} />
              <Route path="/crates" element={<CratesPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
