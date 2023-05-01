import { HelmetProvider } from "react-helmet-async";
import RoutesComponent from "./routes";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import {ToastProvider} from "src/context/hot-toast-context/HotToastContext";
import {UserProvider} from "src/context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <CssBaseline />
    <ErrorBoundary>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
      <AuthProvider>
        <UserProvider>
      <RoutesComponent />
      </UserProvider>
      </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
    </HelmetProvider>
    </ErrorBoundary>
</>
     
    
  )
}

export default App
