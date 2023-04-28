import { HelmetProvider } from "react-helmet-async";
import RoutesComponent from "./routes";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";
function App() {

  return (
    <>
    <CssBaseline />
    <ErrorBoundary>
    <HelmetProvider>
      <RoutesComponent />
    </HelmetProvider>
    </ErrorBoundary>
</>
     
    
  )
}

export default App
