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
import { StationProvider } from "src/context/StationContext"
import { ReactQueryDevtools } from "react-query/devtools";
import {QuotaProvider} from "src/context/QuotaContext";
import './App.css';
// import "/src/App";

function App() {

  const queryClient = new QueryClient();
  return (
    <HelmetProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ErrorBoundary>
            <AuthProvider>
              <UserProvider>
                <QuotaProvider>
                <CarProvider>
                  <StationProvider>
                    <FuelProvider>
                      <RoutesComponent />
                    </FuelProvider>
                  </StationProvider>
                </CarProvider>
                </QuotaProvider>
              </UserProvider>
            </AuthProvider>
          </ErrorBoundary>
        </ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>


  )
}

export default App
