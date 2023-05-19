import React from 'react'
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
// import car from 'src/assets/delivery-truck.gif';
import { Outlet, } from "react-router-dom";
function AuthLayout() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        height: '100vh',
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              // component={NextLink}
              href="/"
              sx={{
                
                display: 'inline-flex',
                height: 45,
                width: 45
              }}
            >
              <Logo />
            </Box>
          </Box>
                <Outlet />

        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              <Box
                component="a"
                sx={{ color: '#15B79E' }}
                target="_blank"


              >              
              {/* <img src={car} alt="car" style={{ width: 45, height: 45 }} /> */}

                <Typography variant="h4" sx={{
                  fontWeight: "bold",
                }} component="div" gutterBottom>
                  INSA GAS STATION
                </Typography>
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{
                mb: 3, fontWeight: "bold",
              }}
              variant="subtitle1"
            >
              A vehicle gas control system 
            </Typography>
            {/* <img
              alt=""
              src="/assets/auth-illustration.svg"
            /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AuthLayout