import { HelmetProvider } from "react-helmet-async";
import RoutesComponent from "./routes";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "src/context/hot-toast-context/HotToastContext";
import { UserProvider } from "src/context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { CarProvider } from "src/context/CarContext";
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
                  <CarProvider>
                    <RoutesComponent />
                  </CarProvider>
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
