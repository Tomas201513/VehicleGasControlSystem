import { HelmetProvider } from "react-helmet-async";
import RoutesComponent from "./routes";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "src/context/hot-toast-context/HotToastContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "src/context/UserContext";
import { CarProvider } from "src/context/CarContext";
import { FuelProvider } from "./context/FuelContext";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <HelmetProvider>
        <CssBaseline />
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <AuthProvider>
                <UserProvider>
                  <CarProvider>
                    <FuelProvider>
                      <RoutesComponent />
                    </FuelProvider>
                  </CarProvider>
                </UserProvider>
              </AuthProvider>
            </ToastProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </>


  )
}

export default App
