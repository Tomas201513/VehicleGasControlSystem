import React from "react";
import { Box } from "@mui/material";
import swr from "src/assets/swr.png";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null, show: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("Error Boundary Caught an error:", error, info);
    this.setState({ info });
  }

  toggleVisibility() {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ backgroundColor: "#649691", height: "100vh" }}>
          <img
            alt="Under development"
            src={swr}
          />
          <h2>Something went wrong.</h2>
          <Button
            variant="contained"
            startIcon={this.state.show ? <VisibilityOffRoundedIcon /> : <RemoveRedEyeRoundedIcon />}
            onClick={this.toggleVisibility}
          >
            {this.state.show ? "Hide Details" : "Show Details"}
          </Button>
          {this.state.show && (
            <>
              <p>{this.state.error.toString()}</p>
              <p>{this.state.info?.componentStack}</p>
            </>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
