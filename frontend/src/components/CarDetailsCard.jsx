import { Card, CardContent, Typography, Grid, Box, Paper, Avatar, LinearProgress, Divider } from '@mui/material';
import propTypes from 'prop-types';
export default function CarDetailsCard({ fuelDataByCar }) {
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} color={props.index === 0 ? "primary" : "inherit"} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }
    // Extract relevant data from the provided object

    // Render the card with the extracted data
    return (
        <>
            <Card sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '0px',
                boxSizing: 'border-box',
                // overflow: 'auto',
                backgroundColor: '#e7ebf0',
            }}>
                <CardContent>
                    {/* <Typography variant="h5" gutterBottom sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.7rem',
                        fontWeight: "bold",
                        color: "#58595b",
                        // textShadow: "1px 1px 2px #ccc",
                    }}>
                        Car Details
                    </Typography> */}
                    <Card sx={{ mt: '2%' }}>
                        <CardContent sx={{ backgroundColor: 'white', overflow: 'none' }}>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Plate Number: {fuelDataByCar?.car?.plateNumber}</Typography>
                                    <Typography variant="body1">Model: {fuelDataByCar?.car?.model}</Typography>
                                    <Typography variant="body1">Year: {fuelDataByCar?.car?.year}</Typography>
                                    <Typography variant="body1">Color: {fuelDataByCar?.car?.color}</Typography>
                                    <Typography variant="body1">Capacity: {fuelDataByCar?.car?.capacity}</Typography>
                                    <Typography variant="body1">Engine: {fuelDataByCar?.car?.engine}</Typography>
                                    <Typography variant="body1">Transmission: {fuelDataByCar?.car?.transmission}</Typography>

                                </Grid>
                                <Grid item xs={6} >
                                    {/* <Typography variant="h5" gutterBottom sx={{
                                        // display: 'flex',
                                        // alignItems: 'center',
                                        // justifyContent: 'center',

                                        fontSize: '2rem',
                                        fontWeight: "bold",
                                        color: "#58595b",
                                    }}>
                                        user
                                    </Typography> */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2,
                                        }} >
                                        <Avatar variant="outlined" sizes='large' sx={{ width: 60, height: 60, }} />
                                    </Box>
                                    <Typography variant="body1" sx={{ mb: 2 }}>Driver: {fuelDataByCar?.car?.driver.userName}</Typography>
                                    <Typography variant="body1">Email: {fuelDataByCar?.car?.driver?.email}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </CardContent >
            </Card >
            <Typography variant="h6" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // fontSize: '1.5rem',
                // fontWeight: "bold",
                color: "#58595b",
                // textShadow: "1px 1px 2px #ccc",
            }}>
                Fuel Intake Details
            </Typography>
            {/* <Divider sx={{ mt: 0 }} /> */}
            <Paper style={{ overflow: 'auto', width: '100%', padding: 2, backgroundColor: '#e7ebf0', height: '60vh' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: 'center', }}>

                    {fuelDataByCar?.fuelIntakeDetails.map((monthDetail, index) => (
                        <Card key={index} sx={{ minWidth: 275, marginBottom: 2 }}>
                            <CardContent >
                                <Typography variant="h6" component="div">
                                    Month: {monthDetail._id.month} Year: {monthDetail._id.year}
                                </Typography>
                                {index === 0 ? <>
                                    <LinearProgressWithLabel determinate value={(1000 - monthDetail.totalFuelAmount) * 100 / 1000} index={index} />
                                </> :
                                    <></>}
                                <Typography>
                                    Total Fuel Amount token: {monthDetail.totalFuelAmount}
                                </Typography>
                                <Typography>
                                    Total Fuel Left: {1000 - monthDetail.totalFuelAmount}
                                </Typography>
                                <Typography>Fuel Intakes:</Typography>
                                <ul>
                                    {monthDetail.fuelIntakes.map((intake, intakeIndex) => (
                                        <li key={intakeIndex}>
                                            Date: {new Date(intake.fuelDate).toLocaleDateString()} - Fuel Amount: {intake.fuelAmount}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Paper>
        </>

    );
}



CarDetailsCard.propTypes = {
    data: propTypes.object.isRequired,
    fuelDataByCar: propTypes.array,
    props: propTypes.object,


};
