/**
 * Field Manual Progress Deck application shell.
 * The product stays intentionally single-page so core schedule actions remain immediately accessible.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PrioritySyllabus from "./pages/PrioritySyllabus";
import PracticeCenter from "./pages/PracticeCenter";
import StudyLibrary from "./pages/StudyLibrary";
import { Route, Switch } from "wouter";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/priority-syllabus" component={PrioritySyllabus} />
      <Route path="/practice" component={PracticeCenter} />
      <Route path="/materials" component={StudyLibrary} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
