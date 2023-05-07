import CardHeader from '@mui/material/CardHeader';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import propTypes from 'prop-types';
export default function CarDetailsCard({ fuelDataByCar }) {
    // Extract relevant data from the provided object

    // Render the card with the extracted data
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Car Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1">Plate Number: {fuelDataByCar?.car.plateNumber}</Typography>
                            <Typography variant="body1">Model: {fuelDataByCar?.car.model}</Typography>
                            <Typography variant="body1">Year: {fuelDataByCar?.car.year}</Typography>
                            <Typography variant="body1">Color: {fuelDataByCar?.car.color}</Typography>
                            <Typography variant="body1">Capacity: {fuelDataByCar?.car.capacity}</Typography>
                            <Typography variant="body1">Engine: {fuelDataByCar?.car.engine}</Typography>
                            <Typography variant="body1">Transmission: {fuelDataByCar?.car.transmission}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Driver: {fuelDataByCar?.car?.driver.userName}</Typography>
                            <Typography variant="body1">Email: {fuelDataByCar?.car?.driver.email}</Typography>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom>
                Fuel Intake Details
            </Typography>
            <Card>
                <CardHeader title={`Current month Total Fuel Intake: ${fuelDataByCar?.fuelIntakeDetails[0].totalFuelAmount}`} />
                <CardContent>

                    {fuelDataByCar?.fuelIntakeDetails[0].fuelIntakes.map((intake, index) => (
                        <Grid key={intake._id} container spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    Date: {new Date(intake.fuelDate).toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    Amount: {intake.fuelAmount}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    Attendant: {intake.attendant}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </CardContent>
            </Card>
        </>

    );
}

CarDetailsCard.propTypes = {
    data: propTypes.object.isRequired,
    fuelDataByCar: propTypes.array,

};

