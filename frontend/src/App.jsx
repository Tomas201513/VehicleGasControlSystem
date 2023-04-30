import { HelmetProvider } from "react-helmet-async";
import RoutesComponent from "./routes";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import {ToastProvider} from "src/context/hot-toast-context/HotToastContext";
function App() {

  return (
    <>
    <CssBaseline />
    <ErrorBoundary>
    <HelmetProvider>
      <ToastProvider>
      <AuthProvider>
      <RoutesComponent />
      </AuthProvider>
      </ToastProvider>
    </HelmetProvider>
    </ErrorBoundary>
</>
     
    
  )
}

export default App
