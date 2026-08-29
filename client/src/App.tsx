/** Desert Monolith style routing: only the immersive house and object routes are surfaced. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Retail from "./pages/Retail";
import Philosophy from "./pages/Philosophy";
import ExclusiveRooms from "./pages/ExclusiveRooms";
import ProductDetail from "./pages/ProductDetail";
import SmoothScroll from "./components/SmoothScroll";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/retail"} component={Retail} />
      <Route path={"/collection"} component={Retail} />
      <Route path={"/exclusive-rooms"} component={ExclusiveRooms} />
      <Route path={"/philosophy"} component={Philosophy} />
      <Route path={"/barrel-01"} component={Retail} />
      <Route path={"/house"} component={Philosophy} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <SmoothScroll><Router /></SmoothScroll>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
