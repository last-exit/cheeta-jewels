/**
 * CHEETA JEWELS / ICON LIVIN : App Router & Root Providers
 * Radical luxury minimalism with dedicated art-directed collection destinations.
 */
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import SmoothScroll from "./components/SmoothScroll";
import Home from "./pages/Home";
import CollectionDetail from "./pages/CollectionDetail";
import ExclusiveRooms from "./pages/ExclusiveRooms";
import Retail from "./pages/Retail";
import ProductDetail from "./pages/ProductDetail";
import Philosophy from "./pages/Philosophy";
import Hayrat from "./pages/Hayrat";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collection/:id" component={CollectionDetail} />
        <Route path="/collection" component={CollectionDetail} />
        <Route path="/rooms" component={CollectionDetail} />
        <Route path="/exclusive-rooms" component={CollectionDetail} />
        <Route path="/retail" component={Retail} />
        <Route path="/eyewear" component={Retail} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/philosophy" component={Philosophy} />
        <Route path="/story" component={Philosophy} />
        <Route path="/founder" component={Philosophy} />
        <Route path="/hayrat" component={Hayrat} />
        <Route path="/cart" component={Cart} />
        {/* Fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster position="bottom-right" />
            <SmoothScroll>
              <Router />
            </SmoothScroll>
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
