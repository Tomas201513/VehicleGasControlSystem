import React from 'react';
import { Container, Box, Card, CardContent, Typography, Grid, useMediaQuery } from '@mui/material';
import UserContext from 'src/context/UserContext';
import FuelContext from 'src/context/FuelContext';
import CarContext from 'src/context/CarContext';
import TotalFuelConsumed from './TotalFuelConsumed';
import { CurrentMonthIntake } from './CurrentMonthIntake';
import { UserCountCard } from './UserCountCard';
import { width } from '@mui/system';
import { OverviewSales } from './OverviewSales'
import { CarModelPieChart } from './CarModelPieChart';
import { LatestOilFill } from './LatestOilFill';
import StationContent from './StationContent';
import StationContext from 'src/context/StationContext';
function Dashboard() {
  const isSmallScreen = useMediaQuery('(min-width:600px)');
  const { userData, userCounts } = React.useContext(UserContext);
  const { fuelData, totalFuelConsumed, currentMonthIntake, fuelDataByMonth } = React.useContext(FuelContext);
  const { scanned, groupedCars, carData } = React.useContext(CarContext);
  const { stationData } = React.useContext(StationContext);
  // const nonAdminUserCounts = userCounts.filter(user => user.roleName !== 'admin');

  const currentYear = new Date().getFullYear();
  const thisYearData = Array(12).fill(0);
  const lastYearData = Array(12).fill(0);

  fuelDataByMonth?.anualIntakes.forEach(yearData => {
    if (yearData._id === currentYear) {
      yearData.monthlyIntakes.forEach(monthData => {
        thisYearData[monthData.month - 1] = monthData.totalFuelAmountMonth;
      });
    } else if (yearData._id === currentYear - 1) {
      yearData.monthlyIntakes.forEach(monthData => {
        lastYearData[monthData.month - 1] = monthData.totalFuelAmountMonth;
      });
    }
  });
  console.log('fuelData?.fuelIntakes', fuelData)
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 15, ml: 5, mr: 5, mb: 5 }}>
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
          userCounts={userCounts}
        // value={nonAdminUserCounts[0]?.count}
        // title={nonAdminUserCounts[0]?.roleName}
        />
        <StationContent
          difference={12}
          sx={{
            flexGrow: 1,
          }}
          stationData={stationData}
        />

        {/* <UserCountCard
          difference={12}
          sx={{
            flexGrow: 1,
          }}
          value={nonAdminUserCounts[1]?.count}
          title={nonAdminUserCounts[1]?.roleName}
        /> */}
      </Box>



      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, m: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: thisYearData
                },
                {
                  name: 'Last year',
                  data: lastYearData
                }
              ]}
              sx={{ flexGrow: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CarModelPieChart
              chartSeries={groupedCars.map(car => car.count)}
              labels={groupedCars.map(car => car._id)}
              sx={{ flexGrow: 1, height: '100%' }}
            />
          </Grid>
        </Grid>
        <LatestOilFill
          fuelIntakes={fuelData}
        />

      </Box>




      {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, m: 5 }}>

        <LatestOilFill
          fuelIntakes={fuelData}
        />

      </Box> */}
    </>
  );
}

export default Dashboard;