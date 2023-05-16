import { useCallback, useEffect, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { useLocation } from "react-router-dom";
import Breadcrumb from "src/components/MyBreadcrumbs";
import AuthContext from 'src/context/AuthContext';
import { useNavigate } from "react-router-dom";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  height: '100vh',
  backgroundColor: "#ffffff",
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { userDetail } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  ); useEffect(() => {
    if (userDetail.roles[0] === "admin") {
      navigate("/app/dashboard");
    } else if (userDetail.roles[0] === "attendant") {
      navigate("/app/scan");
    }
  }, [userDetail]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
        setOpenNav={setOpenNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          {/* <Breadcrumb/> */}
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}
