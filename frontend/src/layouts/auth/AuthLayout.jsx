import React from 'react'
import Pic from 'src/assets/station.png'

import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
// import car from 'src/assets/delivery-truck.gif';
import { Outlet, } from "react-router-dom";
import { Stack } from '@mui/system';
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

          <Stack direction={'column'} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="h4" sx={{
              mt: '5%',
                  fontWeight: "bold",
              border: "none",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.06)",
              borderRadius: "10px",
              transition: "all 0.3s ease-in-out",
              '&:hover': {
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.09)",
              }
            }} >
                  INSA GAS STATION
                </Typography>
                <img src={Pic} alt="Wavy" style={{ width: '70%', height: '50%', objectFit: 'cover' }} />

          </Stack>

        </Grid>
      </Grid>
    </Box>
  )
}

export default AuthLayout