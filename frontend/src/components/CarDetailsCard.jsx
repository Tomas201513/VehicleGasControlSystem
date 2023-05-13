import { Card, CardContent, Typography, Stack, Button, Grid, Box, Paper, Avatar, LinearProgress, Divider, IconButton } from '@mui/material';
import * as React from 'react';
import propTypes from 'prop-types';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AlertDialog from 'src/components/AlertDialog';
import FuelContext from "src/context/FuelContext";
import WarnCard from "src/components/WarnCard";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import TimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
JavascriptTimeAgo.addLocale(en);

export default function CarDetailsCard({ fuelDataByCar, editCard, setEditCard, cardRow, setCardRow, }) {
    function LinearProgressWithLabel(props) {
        return (
            <Box >
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} color={props.index === 0 ? "primary" : "inherit"} />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ minWidth: 250 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }
    // Extract relevant data from the provided object
    const [open, setOpen] = React.useState(false);
    const { deleteFuel, warn, SetWarn } = React.useContext(FuelContext);
    const normalise = (value, min, max) => ((value - min) * 100) / (max - min);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = fuelDataByCar?.fuelIntakeDetails?.length;
    // const images = fuelDataByCar?.fuelIntakeDetails

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    // Render the card with the extracted data
    return (
        <>
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, ml: 5, mr: 5, mb: 5, mt: 5, bgcolor: 'red', }}> */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'
                }}>
                    <Card sx={{
                        flexGrow: 1,

                    }}>
                        <CardContent>
                            <Typography variant="body1">Plate Number: {fuelDataByCar?.car?.plateNumber}</Typography>
                            <Typography variant="body1">Model: {fuelDataByCar?.car?.model}</Typography>
                            <Typography variant="body1">Year: {fuelDataByCar?.car?.year}</Typography>
                            <Typography variant="body1">Color: {fuelDataByCar?.car?.color}</Typography>
                            <Typography variant="body1">Capacity: {fuelDataByCar?.car?.capacity}</Typography>
                            <Typography variant="body1">Engine: {fuelDataByCar?.car?.engine}</Typography>
                            <Typography variant="body1">Transmission: {fuelDataByCar?.car?.transmission}</Typography>

                            {/* <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                            }} > */}

                            {/* <Avatar ariant="outlined" sizes='large' sx={{ width: 60, height: 60, }} /> */}
                            {/* </Box> */}
                            <Typography variant="body1" sx={{ mb: 2 }}>Driver: {fuelDataByCar?.car?.driver.userName}</Typography>
                            <Typography variant="body1">Email: {fuelDataByCar?.car?.driver?.email}</Typography>


                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={6} sx={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    {/* <Box sx={{ flexGrow: 1, }}> */}
                    <Card sx={{
                        flexGrow: 1,
                        minWidth: 275,
                        maxWidth: 400,
                    }}>
                        <CardContent>

                            {/* <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    > */}
                            {/* <Typography>{fuelDataByCar?.fuelIntakeDetails?.[activeStep]?.fuelIntakes */}

                            {/* </Paper> */}
                            <AutoPlaySwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                // onChangeIndex={handleStepChange}
                                enableMouseEvents
                                sx={{ maxWidth: 400, flexGrow: 1, }}
                            >
                                {fuelDataByCar?.fuelIntakeDetails.map((monthDetail, index) => (
                                    <Box key={index} sx={{
                                        maxWidth: '100%', whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip', display: 'flex', flexDirection: 'column',
                                        justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center', }}>
                                            <Stack>


                                                <Typography variant="h6" component="div">
                                                    Month: {monthDetail._id.month} Year: {monthDetail._id.year}
                                                    {index === 0 ?
                                                        <IconButton onClick={() => { setOpen(true); }}>
                                                            <AddIcon />
                                                        </IconButton>
                                                        :
                                                        <></>}
                                                </Typography>
                                                {index === 0 ? <>
                                                    <LinearProgressWithLabel
                                                        determinate
                                                        value={normalise(monthDetail.totalFuelAmount, 0, 1000)}
                                                        index={index}
                                                    />
                                                </> :
                                                    <></>}
                                                <Box sx={{ flexGrow: 1 }} />
                                            </Stack>
                                        </Box>
                                        <Stack
                                            alignItems="flex-start"
                                            direction="row"
                                            justifyContent="space-between"
                                            spacing={3}
                                        >
                                            <Stack spacing={1}>
                                                <Typography color="text.primary"
                                                    variant="overline"
                                                    sx={{ mb: 0, p: 0 }}>
                                                    Total Fuel consumed: {monthDetail.totalFuelAmount} L
                                                </Typography>
                                                <Typography color="text.primary"
                                                    variant="overline"
                                                    sx={{ mb: 0, p: 0 }}>
                                                    Total Fuel Left: {1000 - monthDetail.totalFuelAmount} L
                                                </Typography>
                                                {/* <Typography color="text.primary"
                                            variant="overline"
                                            sx={{ mb: 0, p: 0 }}> Fuel Intakes:</Typography> */}
                                            </Stack>
                                        </Stack>
                                        <ul>
                                            {monthDetail.fuelIntakes.map((intake, intakeIndex) => (
                                                <li key={intakeIndex}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center' }}>
                                                        <Typography color="text.primary"
                                                            variant="overline"
                                                            sx={{ mb: 0, p: 0 }}>

                                                            {intake.fuelAmount} L &nbsp;
                                                            {/* <TimeAgo date={intake.fuelDate} /> */}
                                                            ({new Date(intake.fuelDate).toLocaleDateString()})
                                                        </Typography>

                                                        <Box sx={{ flexGrow: 1 }} />
                                                        {index === 0 ? <>
                                                            <IconButton onClick={() => {
                                                                setCardRow(intake); console.log("Editing:", intake); setOpen(true);
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
                            </AutoPlaySwipeableViews>

                            <MobileStepper
                                sx={{ flexGrow: 1, }}
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
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                        ) : (
                                            <KeyboardArrowLeft />
                                        )}
                                        Back
                                    </Button>
                                }
                            />

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
            <AlertDialog open={open} setOpen={setOpen} editCard={editCard} setEditCard={setEditCard} />
            <WarnCard
                open={warn}
                setOpen={SetWarn}
                title={"Delete User"}
                content={"Are you sure you want to delete this user?"}
                action={deleteFuel}
                setCardRow={setCardRow}
                cardRow={cardRow}
            />
        </>

    );
}



CarDetailsCard.propTypes = {
    data: propTypes.object.isRequired,
    fuelDataByCar: propTypes.array,
    props: propTypes.object,
    editCard: propTypes.bool,
    setEditCard: propTypes.func,
    cardRow: propTypes.object,
    setCardRow: propTypes.func,


};

