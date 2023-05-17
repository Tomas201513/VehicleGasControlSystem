import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import React from 'react';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import useResponsive from 'src/hooks/useResponsive';
// import { Logo } from 'src/components/logo';
// import { Scrollbar } from 'src/components/scrollbar';
// import { Scrollbar } from '../../components/scrollbar';
import { adminItems, attendantItems } from './config';
import { SideNavItem } from './side-nav-item';
import AuthContext from "src/context/AuthContext";


export const SideNav = ({ open, onClose, setOpenNav, openNav }) => {
  const { userDetail } = React.useContext(AuthContext);

  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");

  const content = (
    // <Scrollbar
    //   sx={{
    //     height: '100vh',
    //     '& .simplebar-content': {
    //       height: '100vh'
    //     },
    //     '& .simplebar-scrollbar:before': {
    //       background: 'neutral.400'
    //     }
    //   }}
    // >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >

      <Box sx={{ p: 3 }}>
        <Box
          // component={NextLink}
          href="/"
          sx={{
            display: 'inline-flex',
            height: 32,
            width: 32
          }}
        >
          {/* <Logo /> */}


        </Box>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            p: '12px'
          }}
          onClick={() => setOpenNav(!openNav)}
        >
          <div>
            <Typography
              variant="h5"
              sx={{
                color: '#bdbdbe',
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                // fontSize: 16,
                fontWeight: 600,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
              }}


            >
              INSA
            </Typography>
            {"Gas Station"}
            {/* <Typography
                color="neutral.400"
                variant="body2"
              >
              Production
              </Typography> */}
          </div>

          <SvgIcon
            fontSize="small"
            sx={{ color: 'neutral.500' }}
          >
            <ChevronUpDownIcon />
          </SvgIcon>

        </Box>
      </Box>
      <Divider sx={{ borderColor: 'neutral.700' }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0
          }}
        >
          {userDetail && userDetail?.roles[0] === "admin" && (<>

            {adminItems.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </>)}
          {userDetail && userDetail?.roles[0] === "attendant" && (<>

            {attendantItems.map((item) => {
              const active = item.path ? (pathname === item.path) : false;
              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </>)}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: 'neutral.700' }} />

    </Box>
    // </Scrollbar>
  );

  if (isDesktop) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#202124",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#1c2536',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};


SideNav.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setOpenNav: PropTypes.func,
  openNav: PropTypes.bool

};
