import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Container, Stack, Grid, CardHeader, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthContext from 'src/context/AuthContext';
import StationContext from 'src/context/StationContext';
import UserContext from 'src/context/UserContext';

function FillStation() {
    const { refetchAccount } = React.useContext(UserContext);
    const { fillStation, stationData, refetch: refetchStation } = React.useContext(StationContext);
    const { userDetail } = React.useContext(AuthContext);
    const validationSchema = Yup.object().shape({
        // fuelAmount: Yup.number().min(1, 'Fuel amount must be greater than zero').required('Fuel amount is required')
    });

    const handleSubmit = (id, fuelAmount) => {
        console.log('oooooooooooo', id, fuelAmount);
        fillStation({ id, fuelAmount });
        refetchStation();
    };
    React.useEffect(() => {
        if (userDetail) {
            console.log('userDetail', userDetail);
            const fetchData = async () => {
                refetchAccount();
                refetchStation();
            };
            fetchData();
        }
    }, [userDetail]);

    return (
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
            <Container maxWidth="lg">
                <div>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Stations
                    </Typography>
                </div>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 3 }}>
                    {stationData?.map((station) => (
                        <Card key={station._id} sx={{ p: 3, width: '100%', flexGrow: 1 }}>
                            <CardHeader
                                sx={{ p: 3, width: '90%', flexGrow: 1 }}
                                title={`${station?.stationName}`}
                                variant={{ xs: 'h6', md: 'h5' }}
                            />
                            <CardContent sx={{ pt: 0 }}>
                                <Box>
                                    <Grid container spacing={{ xs: 2, md: 3 }}>
                                        <Grid item xs={12} md={6}>
                                            <Typography color="text.secondary" variant="body2">
                                                Current Amount: {station?.currentFuelAmount}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography color="text.secondary" variant="body2">
                                                Capacity: {station?.FuelCapacity}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography color="text.secondary" variant="body2">
                                                Location: {station?.stationLocation}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography color="text.secondary" variant="body2">
                                                Owner: {station?.stationOwner}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Formik initialValues={{ fuelAmount: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ errors, touched, values, handleChange }) => (
                                        <Form>
                                            <Grid container spacing={{ xs: 2, md: 3 }}>
                                                <Grid item xs={12} md={6}>
                                                    <Container maxWidth="md" sx={{ maxWidth: 600 }}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            label="Fuel Amount"
                                                            name="fuelAmount"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.fuelAmount}
                                                            error={Boolean(touched.fuelAmount && errors.fuelAmount)}
                                                            helperText={touched.fuelAmount && errors.fuelAmount}
                                                        />
                                                    </Container>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Button fullWidth variant="text" onClick={() => handleSubmit(station?._id, values?.fuelAmount)}>
                                                        Fill Station
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </CardActions>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}

export default FillStation;