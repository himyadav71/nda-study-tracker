/**
 * Field Manual Progress Deck application shell.
 * The product stays intentionally single-page so core schedule actions remain immediately accessible.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FileText } from "lucide-react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PrioritySyllabus from "./pages/PrioritySyllabus";
import PracticeCenter from "./pages/PracticeCenter";
import PredictedPapers from "./pages/PredictedPapers";
import FiveYearAnalysis from "./pages/FiveYearAnalysis";
import StudyLibrary from "./pages/StudyLibrary";
import { Link, Route, Switch } from "wouter";

function PracticeRoute() {
  return <><PracticeCenter /><Link href="/predicted-papers" className="practice-prediction-bridge"><FileText size={16} /> Full NDA II 2026 predicted papers</Link></>;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/priority-syllabus" component={PrioritySyllabus} />
      <Route path="/practice" component={PracticeRoute} />
      <Route path="/predicted-papers" component={PredictedPapers} />
      <Route path="/five-year-analysis" component={FiveYearAnalysis} />
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
