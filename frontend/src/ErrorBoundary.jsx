import React from "react";
import { Box } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("Error Boundary Caught an error:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ backgroundColor: "#649691", height: "100vh" }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error.toString()}</p>
          <p>{this.state.info?.componentStack}</p>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;