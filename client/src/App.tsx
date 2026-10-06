/**
 * CHEETA JEWELS / ICON LIVIN: App Router & Root Providers
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
import Founder from "./pages/Founder";
import Film from "./pages/Film";
import House from "./pages/House";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Care from "./pages/Care";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
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
        <Route path="/rooms" component={ExclusiveRooms} />
        <Route path="/exclusive-rooms" component={ExclusiveRooms} />
        <Route path="/retail" component={Retail} />
        <Route path="/eyewear" component={Retail} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/philosophy" component={Philosophy} />
        <Route path="/story" component={Philosophy} />
        <Route path="/founder" component={Founder} />
        <Route path="/hayrat" component={Hayrat} />
        <Route path="/cart" component={Cart} />
        <Route path="/film" component={Film} />
        <Route path="/house" component={House} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/returns" component={Returns} />
        <Route path="/care" component={Care} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/accessibility" component={Accessibility} />
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
