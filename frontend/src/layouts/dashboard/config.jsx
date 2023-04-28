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

export const items = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Users',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cars',
    path: '/cars',
    icon: (
      <AiFillCar fontSize="large" />
    )

  },
  {
    title: 'Fuel',
    path: '/fuel',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  
];
