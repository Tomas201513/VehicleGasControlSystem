import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Grid,
  Box,
  LinearProgress,
  Divider,
  IconButton,
} from "@mui/material";
import * as React from "react";
import propTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import EditFuelDialogue from "src/components/EditFuelDialogue";
import FuelContext from "src/context/FuelContext";
import WarnCard from "src/components/WarnCard";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import PersonIcon from "@mui/icons-material/Person";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Container, CardHeader } from "@mui/material";

export default function CarDetailsCard({
  fuelDataByCar,
  editCard,
  setEditCard,
  cardRow,
  setCardRow,
  scanned,
}) {
  function LinearProgressWithLabel(props) {
    return (
      <Box>
        <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
          <Box sx={{ width: "90%", ml: "1%" }}>
            <LinearProgress
              variant="determinate"
              {...props}
              color={props.index === 0 ? "primary" : "inherit"}
            />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        </Stack>
      </Box>
    );
  }
  // Extract relevant data from the provided object
  const [open, setOpen] = React.useState(false);
  const { deleteFuel, warn, SetWarn, refetchByCar, activeStep, setActiveStep } =
    React.useContext(FuelContext);
  const normalise = (value, min, max) => ((value - min) * 100) / (max - min);
  const theme = useTheme();
  const maxSteps = fuelDataByCar?.totalPages;
  // const images = fuelDataByCar?.fuelIntakeDetails
  console.log("fuelDataByCarrrrrrr", fuelDataByCar);
  console.log("maxSteps", fuelDataByCar?.totalPages);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  console.log("activeStep", activeStep);
  React.useEffect(() => {
    refetchByCar();
  }, [activeStep]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: "5%",
          ml: "5%",
          mr: "5%",
        }}
      >
        <Grid container spacing={5}>
          <Grid xs={12} md={6} lg={4}>
            <Card
              sx={{
                m: 2,
                p: 2,
                border: "none",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid xs={12} md={6} lg={6} sx={{ textAlign: "center" }}>
                    <PersonIcon
                      sx={{
                        fontSize: 60,
                        bgcolor: "primary.main",
                        color: "white",
                        borderRadius: "50%",
                        p: 1,
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={6} lg={6} sx={{ textAlign: "center" }}>
                    {" "}
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      DRIVER:
                    </Typography>
                    <Typography color="text.primary" variant="overline" sx={{ fontWeight: "bold" }}>
                      {" "}
                      {fuelDataByCar?.car?.driver.userName}
                    </Typography>
                    <br />
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      EMAIL:
                    </Typography>
                    <Typography color="text.primary" variant="overline" sx={{ fontWeight: "bold" }}>
                      {" "}
                      {fuelDataByCar?.car?.driver?.email}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ m: 2 }} />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid xs={12} md={6} lg={6} sx={{ textAlign: "center", mt: "10%" }}>
                    <DirectionsBusIcon
                      sx={{
                        fontSize: 60,
                        bgcolor: "primary.main",
                        color: "white",
                        borderRadius: "50%",
                        p: 1,
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={6} lg={6} sx={{ textAlign: "center" }}>
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      Plate Number:
                    </Typography>
                    <Typography color="text.primary" variant="overline" sx={{ fontWeight: "bold" }}>
                      {fuelDataByCar?.car?.plateNumber}
                    </Typography>
                    <br />
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      Model:
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="overline"
                      sx={{ mb: 0, p: 0, fontWeight: "bold" }}
                    >
                      {" "}
                      {fuelDataByCar?.car?.model}
                    </Typography>
                    <br />
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      Year:
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="overline"
                      sx={{ mb: 0, p: 0, fontWeight: "bold" }}
                    >
                      {fuelDataByCar?.car?.year}
                    </Typography>
                    <br />
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      Color:
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="overline"
                      sx={{ mb: 0, p: 0, fontWeight: "bold" }}
                    >
                      {fuelDataByCar?.car?.color}
                    </Typography>
                    <br />
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      Capacity:
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="overline"
                      sx={{ mb: 0, p: 0, fontWeight: "bold" }}
                    >
                      {fuelDataByCar?.car?.capacity}
                    </Typography>
                    <br />
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      Engine:
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="overline"
                      sx={{ mb: 0, p: 0, fontWeight: "bold" }}
                    >
                      {" "}
                      {fuelDataByCar?.car?.engine}
                    </Typography>
                    <br />
                    <Typography color="text.primary" variant="overline" sx={{ mb: 0, p: 0 }}>
                      Transmission:
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="overline"
                      sx={{ mb: 0, p: 0, fontWeight: "bold" }}
                    >
                      {fuelDataByCar?.car?.transmission}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={5}>
          <Card sx={{
                            m: 2,
                            p: '2%',
                            border: "none",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            '&:hover': {
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            }
                        }}>
                            <CardHeader
                                subheader="The information can be edited"
                                title="Fuel Intake Details"
                            />
                             {activeStep === 0 ? <>
                                            <LinearProgressWithLabel
                                                determinate
                                                value={normalise(fuelDataByCar?.fuelIntakeDetail[0].totalFuelAmount, 0, 1000)}
                                                index={activeStep}
                                            />
                                        </> :
                                            <>
                                <Divider sx={{ mb: 2 }} />
                                            </>}
                            <CardContent >

                        
                                {fuelDataByCar?.fuelIntakeDetail.map((monthDetail, index) => (
                                    <Box key={index} sx={{
                                        maxWidth: '100%', whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip', display: 'flex', flexDirection: 'column',
                                        justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center', }}>
                                            <Typography  sx={{mr:3, fontWeight: 'bold', }}>
                                                {monthDetail._id.month} / {monthDetail._id.year}
                                            </Typography>
                                                <Button onClick={() => { setOpen(true); }}>
                                                {"Fill Fuel"}<AddIcon /> 
                                                </Button>
                                        </Box>
                                       
                                        <Stack
                                            alignItems="flex-start"
                                            direction="row"
                                            justifyContent="space-between"
                                            spacing={3}
                                        >
                                            <Stack spacing={1}>
                                            <Typography variant="overline" sx={{ mb: 0, p: 0 }}>
                                        <Typography component="span" color="text.secondary" >
                                            Total Fuel consumed:
                                        </Typography>
                                        <Typography component="span" color="text.primary" sx={{ fontWeight: 'bold' ,ml:1}}>
                                            {monthDetail.totalFuelAmount} L
                                        </Typography>
                                    </Typography>
                                    <Typography variant="overline" sx={{ mb: 0, p: 0 }}>
                                        <Typography component="span" color="text.secondary">
                                        Total Fuel Left:
                                        </Typography>
                                        <Typography component="span" color="text.primary" sx={{ fontWeight: 'bold' ,ml:1}}>
                                        {1000 - monthDetail.totalFuelAmount} L
                                        </Typography>
                                    </Typography>
                                            </Stack>
                                        </Stack>
                                        <ul>
                                            {monthDetail.fuelIntakes.map((intake, intakeIndex) => (
                                                <li key={intakeIndex}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center' }}>
                                                        <Typography color="text.primary"
                                                            variant="overline"
                                                            sx={{ mb: 0, p: 0 ,fontWeight: 'bold', }}>

                                                            {intake.fuelAmount} L &nbsp;
                                                            {/* <TimeAgo date={intake.fuelDate} /> */}
                                                            ({new Date(intake.fuelDate).toLocaleDateString()})
                                                        </Typography>

                                                        <Box sx={{ flexGrow: 1 }} />
                                                        {index === 0 ? <>
                                                            <IconButton onClick={() => {
                                                                setCardRow(intake); console.log("Editing:", intake); setOpen(true); setEditCard(true);
                                                            }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => {
                                                                console.log("Delete icon clicked");
                                                                console.log(`delete`, intake);
                                                                SetWarn(true);
                                                                setCardRow(intake);
                                                            }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>
                                                            :
                                                            <></>}
                                                    </Box>
                                                </li>
                                            ))}
                                        </ul>
                                    </Box>
                                ))}
                            {/* </AutoPlaySwipeableViews>s */}

                            <MobileStepper
                  sx={{ flexGrow: 1 }}
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Back
                    </Button>
                  }
                />

                        </CardContent>
                        </Card>
          </Grid>
        </Grid>
      </Box>

      <EditFuelDialogue
        open={open}
        car={fuelDataByCar?.car?._id}
        setOpen={setOpen}
        editCard={editCard}
        setEditCard={setEditCard}
        scanned={scanned}
      />
      <WarnCard
        open={warn}
        setOpen={SetWarn}
        title={"Delete User"}
        content={"Are you sure you want to delete this user?"}
        action={deleteFuel}
        setCardRow={setCardRow}
        cardRow={cardRow}
        refetchByCar={refetchByCar}
      />
    </>
  );
}

CarDetailsCard.propTypes = {
  data: propTypes.object,
  fuelDataByCar: propTypes.array,
  props: propTypes.object,
  editCard: propTypes.bool,
  setEditCard: propTypes.func,
  cardRow: propTypes.object,
  setCardRow: propTypes.func,
  scanned: propTypes.string,
};
