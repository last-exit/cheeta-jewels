/**
 * CHEETA JEWELS : App Router & Root Providers
 * Radical luxury minimalism with single collapsible sidebar navigation.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import SmoothScroll from "./components/SmoothScroll";
import Home from "./pages/Home";
import ExclusiveRooms from "./pages/ExclusiveRooms";
import Retail from "./pages/Retail";
import ProductDetail from "./pages/ProductDetail";
import Philosophy from "./pages/Philosophy";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rooms" component={ExclusiveRooms} />
      <Route path="/exclusive-rooms" component={ExclusiveRooms} />
      <Route path="/retail" component={Retail} />
      <Route path="/collection" component={Retail} />
      <Route path="/eyewear" component={Retail} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/philosophy" component={Philosophy} />
      <Route path="/story" component={Philosophy} />
      <Route path="/founder" component={Philosophy} />
      <Route path="/cart" component={Cart} />
      {/* Fallback route */}
      <Route component={NotFound} />
    </Switch>
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
