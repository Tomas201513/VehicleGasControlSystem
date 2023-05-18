import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import { AiFillCar } from "react-icons/ai";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';

export const adminItems = [
  {
    title: 'Dashboard',
    path: '/app/dashboard',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/app/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cars',
    path: '/app/cars',
    icon: (
      <AiFillCar fontSize="large" />
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