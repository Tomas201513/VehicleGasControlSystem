import {useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthLayout from 'src/layouts/auth/AuthLayout';
import { Link } from "react-router-dom";
import AuthContext from 'src/context/AuthContext';
import ToastContext from "src/context/hot-toast-context/HotToastContext";
import React from "react";

function Login() {
  const { userDetail,loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
    const { showToast } = React.useContext(ToastContext);

  const navigate = useNavigate();
useEffect(() => {
  if (userDetail) {
    navigate("/app", { replace: true });
    // showToast("Welcome back " + userDetail.userName, "success", 2000);
  }
}, [userDetail]);
  const formik = useFormik({
    initialValues: {
      email: 'admin@admin.com',
      password: '201513119T@m',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        console.log(helpers);
        await loginUser(values);
        console.log("login");
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        // navigate('/dashboard', { replace: true });
       
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      {/* <AuthLayout> */}
      <Helmet title="Login" />
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link to="/register" variant="h6">
                  Register
                </Link>
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                // onClick={() => {
                // navigate("/dashboard");
                // }}
              >
                Continue
              </Button>

              <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                <div>
                  Email <b>admin@admin.com</b> and password <b>201513119T@m</b>
                </div>
              </Alert>
            </form>
          </div>
        </Box>
      </Box>
      {/* </AuthLayout> */}
    </>
  );
}

export default Login