import { useState, useContext, useEffect } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
  Badge,
  styled,
} from "@mui/material";
import AuthContext from "src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
// mocks_
// import account from "../../../_mock/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: < HomeIcon sx={{ mr: 1, color: '#9da4ae' }} />,
    nav: "/app/home",
  },
  {
    label: "Profile",
    icon: <PersonIcon sx={{ mr: 1, color: '#9da4ae' }} />,
    nav: "/app/account",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();  
  const { userDetail, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  useEffect(() => {
    // console.log("userDetail" + JSON.stringify(userDetail));
  }, [userDetail]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: '#c5ddf4',
            },
          }),
        }} 
      > <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
          <Avatar sx={{
            backgroundColor: '#c5ddf4', color: '#1a237e', width: 40, height: 40
          }}>

            {userDetail?.email?.charAt(0).toUpperCase()}

          </Avatar>
        </StyledBadge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap fontSize={15}>
            {userDetail && userDetail.email}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userDetail && userDetail.roles[0]} 
          </Typography>
        </Box>
        <Stack >
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => { navigate(option.nav); handleClose() }}>
              {option.icon}
              {option.label}
            </MenuItem>
          ))}

        <Divider sx={{ borderStyle: "dashed" }} />
          <MenuItem onClick={() => logoutUser()}>
            <LogoutIcon sx={{ mr: 1, color: '#9da4ae' }} />
            Logout

          </MenuItem>
        </Stack>
      </Popover>
    </>
  );
}


