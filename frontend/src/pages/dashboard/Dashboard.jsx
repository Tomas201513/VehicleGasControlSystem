import React, { useEffect } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import UserContext from 'src/context/UserContext';
import FuelContext from 'src/context/FuelContext';
import CarContext from 'src/context/CarContext';
import TotalFuelConsumed from './TotalFuelConsumed';
import { CurrentMonthIntake } from './CurrentMonthIntake';
import { UserCountCard } from './UserCountCard';
import { FuelIntakeBarChart } from './FuelIntakeBarChart'
import { CarModelPieChart } from './CarModelPieChart';
import { LatestOilFill } from './LatestOilFill';
import StationContent from './StationContent';
import StationContext from 'src/context/StationContext';
import AuthContext from 'src/context/AuthContext';
import { GetStation } from '../../apis/StationApi';
function Dashboard() {
  const isSmallScreen = useMediaQuery('(min-width:600px)');
  const { userDetail } = React.useContext(AuthContext);
  const { userData, userCounts, refetch: refetchUser, refetchAccount } = React.useContext(UserContext);
  const { fuelData, totalFuelConsumed, currentMonthIntake, fuelDataByMonth, refetch: refetchFuel,
    refetchByCar,
    refetchByMonth, } = React.useContext(FuelContext);
  const { scanned, groupedCars, carData, refetch: refetchCar } = React.useContext(CarContext);
  const { stationData, refetch: refetchStation } = React.useContext(StationContext);
  // const nonAdminUserCounts = userCounts.filter(user => user.roleName !== 'admin');
  const currentYear = new Date().getFullYear();
  const thisYearData = Array(12).fill(0);
  const lastYearData = Array(12).fill(0);
  // const size = fuelData?.fuelIntakes.slice(-1)[0]||0
  const startDate = fuelData?.fuelIntakes?.slice(-1)[0]?.fuelDate
  const x = fuelDataByMonth?.anualIntakes[0].monthlyIntakes[0].totalFuelAmountMonth
  const y = fuelDataByMonth?.anualIntakes[0].monthlyIntakes[1].totalFuelAmountMonth
  const percent = ((x - y) / ((y) / 2) * 100).toFixed(2)
  const [positive, setPosetive] = React.useState(false)

  React.useEffect(() => {
    if (percent > 0) {
      setPosetive(true);
    } else {
      setPosetive(false);
    }
  }, [percent]);

  React.useEffect(() => {
    if (userDetail) {
      console.log('userDetail', userDetail);
      const fetchData = async () => {
        refetchUser();
        refetchFuel();
        refetchCar();
        refetchStation();
        refetchByMonth();
        refetchAccount();


      };

      fetchData();
    }
  }, [userDetail]);
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
  const sx = {
    flexGrow: 1, border: "none",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.06)",
    borderRadius: "10px",
  }
  const sx2 = {
    fontSize: '0.97rem',
    fontWeight: "normal",
  }
  const sx3 = {
    fontSize: '0.97rem',
    fontWeight: "bold",
  }
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: '5%', ml: '5%', mr: '5%', mb: 5, }}>
        <TotalFuelConsumed
          difference={12}
          title={'TOTAL CONCEPTION'}
          sx={sx}
          sx2={sx2}
          sx3={sx3}
          value={totalFuelConsumed}
        />
        <CurrentMonthIntake
          difference={12}
          sx={sx}
          startDate={startDate}
          value={currentMonthIntake}
          percent={percent}
          positive={positive}

        />
        <UserCountCard
          difference={12}
          sx={sx}
          userCounts={userCounts}
        />
        <StationContent
          difference={12}
          sx={sx}
          stationData={stationData}
          positive
        />
      </Box>



      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: '5%', ml: '5%', mr: '5%', mb: 5, }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <FuelIntakeBarChart
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
              sx={sx}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CarModelPieChart
              chartSeries={groupedCars.map(car => car.count)}
              labels={groupedCars.map(car => car._id)}
              sx={{
                flexGrow: 1, height: '100%', boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
        <LatestOilFill
          fuelIntakes={fuelData}
          sx={{
            flexGrow: 1,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
            borderRadius: "10px",
            mt: '5%'
          }}
          sx2={sx2}
          sx3={sx3}
        />

      </Box>
    </>
  );
}

export default Dashboard;