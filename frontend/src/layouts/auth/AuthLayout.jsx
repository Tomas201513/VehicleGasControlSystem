import React from 'react'
import Pic from 'src/assets/station4.png'

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
            className: 'ola',
          }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Neuton',
                fontSize: '2em',
                lineHeight: '1.5',
                color: '#e2e2e2',
                textAlign: 'center',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '.5em',
                display: 'inline-block',
                border: '4px double rgba(255,255,255,.25)',
                borderWidth: '4px 0',
              }}
            >
              INSA GAS STATION
            </Typography>
            <img src={Pic} alt="Wavy" style={{ width: '60%', objectFit: 'cover' }} />


          </Stack>

        </Grid>
      </Grid>
    </Box>
  )
}

export default AuthLayout