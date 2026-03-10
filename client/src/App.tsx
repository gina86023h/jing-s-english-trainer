import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageProvider";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/Dashboard";
import LevelPage from "@/pages/LevelPage";
import WorkspacePage from "@/pages/WorkspacePage";
import ProgressPage from "@/pages/ProgressPage";
import ErrorNotebookPage from "@/pages/ErrorNotebookPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/level/:level" component={LevelPage} />
      <Route path="/exercise/:id" component={WorkspacePage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/error-notebook" component={ErrorNotebookPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
