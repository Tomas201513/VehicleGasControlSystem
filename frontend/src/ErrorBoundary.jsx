import React from "react";
import { Box } from "@mui/material";
import swr from "src/assets/swr.gif";
// import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { PropTypes } from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null, show: false };
    this.toggleVisibility = this.toggleVisibility.bind(this);

  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // console.log("Error Boundary Caught an error:", error, info);
    this.setState({ info });
  }

  toggleVisibility() {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: '5rem' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img
            alt="Under development"
            src={swr}
              style={{ width: "19%", height: "10%" }}
            />

            <Typography sx={{ color: "#0f6eff" }}>Something went wrong!</Typography>
          <Button
            variant="contained"
            startIcon={this.state.show ? <VisibilityOffRoundedIcon /> : <RemoveRedEyeRoundedIcon />}
            onClick={this.toggleVisibility}
            >
            {this.state.show ? "Hide Details" : "Show Details"}
          </Button>
          </Box>
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

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
