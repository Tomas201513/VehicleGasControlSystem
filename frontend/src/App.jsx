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
// import "/src/App";
import { useStyles } from "src/components/scrollbar";

function App() {
  const classes = useStyles();

  const queryClient = new QueryClient();
  return (
    <div className={classes.root}>
      <HelmetProvider>
        <CssBaseline />
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <AuthProvider>
                <UserProvider>
                  <CarProvider>
                    <StationProvider>
                    <FuelProvider>
                      <RoutesComponent />
                    </FuelProvider>
                    </StationProvider>
                  </CarProvider>
                </UserProvider>
              </AuthProvider>
            </ToastProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </div>


  )
}

export default App
