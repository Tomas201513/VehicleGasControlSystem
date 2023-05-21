import { SvgIcon } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'; import GroupIcon from '@mui/icons-material/Group';
export const adminItems = [
  {
    title: 'Dashboard',
    path: '/app/dashboard',
    icon: (
      <SvgIcon fontSize="small">
        <DashboardIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/app/users',
    icon: (
      <SvgIcon fontSize="small">
        <GroupIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cars',
    path: '/app/cars',
    icon: (
      <DirectionsCarFilledIcon fontSize="small" />
    )

  },
  {
    title: 'Fuel',
    path: '/app/fuel',
    icon: (
      <SvgIcon fontSize="small">
        <OilBarrelIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Station',
    path: '/app/station',
    icon: (
      <SvgIcon fontSize="small">
        <LocalGasStationIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Fill Station',
  //   path: '/app/fillstation',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LocalGasStationIcon />
  //     </SvgIcon>
  //   )
  // }, 
  {
    title: 'Scan',
    path: '/app/scan',
    icon: (
      <SvgIcon fontSize="small">
        <QrCodeScannerIcon />
      </SvgIcon>
    )
  },

];

export const attendantItems = [
  // {
  //   title: 'Dashboard',
  //   path: '/dashboard',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ChartBarIcon />
  //     </SvgIcon>
  //   )
  // }, 
  {
    title: 'Scan',
    path: '/app/scan',
    icon: (
      <SvgIcon fontSize="small">
        <QrCodeScannerIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Station',
    path: '/app/fillstation',
    icon: (
      <SvgIcon fontSize="small">
        <LocalGasStationIcon />
      </SvgIcon>
    )
  },

];