import React from 'react';
import { Container, Box, Card, CardContent, Typography, Grid, useMediaQuery } from '@mui/material';
import UserContext from 'src/context/UserContext';
import FuelContext from 'src/context/FuelContext';
import CarContext from 'src/context/CarContext';
import TotalFuelConsumed from './TotalFuelConsumed';
import { CurrentMonthIntake } from './CurrentMonthIntake';
import { UserCountCard } from './UserCountCard';
import { width } from '@mui/system';
function Dashboard() {
  const isSmallScreen = useMediaQuery('(min-width:600px)');
  const { userData, userCounts } = React.useContext(UserContext);
  const { fuelData, totalFuelConsumed, currentMonthIntake } = React.useContext(FuelContext);
  const { scanned } = React.useContext(CarContext);
  const nonAdminUserCounts = userCounts.filter(user => user.roleName !== 'admin');
  console.log('nonAdminUserCounts', nonAdminUserCounts);

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 10, ml: 5, mr: 5 }}>
        <TotalFuelConsumed
          difference={12}
          title={'TOTAL CONCEPTION'}
          sx={{
            flexGrow: 1,
          }}
          value={totalFuelConsumed}
        />
        <CurrentMonthIntake
          difference={12}
          sx={{
            flexGrow: 1,
          }}
          value={currentMonthIntake}
        />
        <UserCountCard
          difference={12}
          sx={{
            flexGrow: 1,
          }}
          value={nonAdminUserCounts[0]?.count}
          title={nonAdminUserCounts[0]?.roleName}
        />
        <UserCountCard
          difference={12}
          sx={{
            flexGrow: 1,
          }}
          value={nonAdminUserCounts[1]?.count}
          title={nonAdminUserCounts[1]?.roleName}
        />
      </Box>


    </>
  );
}

export default Dashboard;
{/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 10, ml: 10, m: 10 }}>
  <Card sx={{ flexGrow: 1, minWidth: 200, minHeight: isSmallScreen ? 150 : 90, }}>
    <CardContent>
      <Typography variant="h4">{totalFuelConsumed}</Typography>
      <Typography variant="h6">{'TOTAL CONCEPTION'}</Typography>
    </CardContent>
  </Card>
  <Card sx={{ flexGrow: 1, minWidth: 200, minHeight: 150 }}>
    <CardContent>
      <Typography variant="h4">{currentMonthIntake}</Typography>
      <Typography variant="h6">{'CURRENT MONTH CONCEPTION'}</Typography>
    </CardContent>
  </Card>

  {userCounts.map((item, index) => (
    <Card key={item.roleName} sx={{
      flexGrow: 1, minWidth: 200, minHeight: isSmallScreen ? 150 : 90,
    }}>
      <CardContent>
        <Typography variant="h4">{item.count}</Typography>
        <Typography variant="h6">{title[index]}</Typography>
      </CardContent>
    </Card>
  ))}

</Box> */}