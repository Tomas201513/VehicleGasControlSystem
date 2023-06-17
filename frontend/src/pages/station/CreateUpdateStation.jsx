import { useContext } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    Container,
    Tooltip,
    IconButton,
    FormControlLabel,
    Switch,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Formik, Form } from "formik";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import Warndialogue from "src/components/Warndialogue";

import StationContext from "src/context/StationContext";
export default function CreateUpdateStation({ selectedData, editable, setEditable }) {

    const { name, createStation, updateStation, setSelectedData, setCreateOpen, deleteStation, warn, SetWarn } = useContext(StationContext);

    const FormSchema = yup.object().shape({
        stationName: yup.string().required("station name is required"),
        stationLocation: yup.string().required("station location is required"),
        stationOwner: yup.string().required("station owner is required"),
        FuelCapacity: yup.number().required("station owner is required"),
        currentFuelAmount: yup.number().required("station owner is required"),
    })
    const handleSubmit = async (values) => {
        try {
            if (selectedData) {
                // console.log('torpa', values);
                await updateStation({ selectedData: selectedData._id, values });
            } else {
                // console.log(values);
                await createStation(values);
            }
            setEditable(false);
        } catch (error) {
            // console.log(error);
        }
    }
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: '10%', ml: '5%',
                    mr: '5%',
                }}
            >
                <Container maxWidth="lg">

                    < Box>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={12}
                                lg={4}
                            >
                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={'5%'}>

                                    <Tooltip title="Back">
                                        <IconButton
                                            onClick={() => {
                                                setSelectedData(null), setEditable(false), setCreateOpen(false);
                                            }}
                                            size="small"
                                        >
                                            <ArrowBackIcon size="small" />
                                        </IconButton>
                                    </Tooltip>
                                    {/* <Box sx={{ flexGrow: 1 }} /> */}

                                </Box>
                            </Grid>
                            <Grid
                                xs={12}
                                md={12}
                                lg={12}
                            >
                                <Formik
                                    initialValues={{
                                        stationName: selectedData?.stationName || "",
                                        stationLocation: selectedData?.stationLocation || "",
                                        stationOwner: selectedData?.stationOwner || "",
                                        FuelCapacity: selectedData?.FuelCapacity || "",
                                        currentFuelAmount: selectedData?.currentFuelAmount || "",
                                    }}
                                    validationSchema={FormSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur }) => (
                                        <Form>
                                            <Card const sx={{
                                                flexGrow: 1,
                                                border: "none",
                                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.06)",
                                                borderRadius: "10px",
                                                transition: "all 0.3s ease-in-out",
                                                '&:hover': {
                                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                                }
                                            }}>
                                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={'2%'}>

                                                    <CardHeader
                                                        title={selectedData ? "Update Station" : "Create Station"}
                                                        subheader={selectedData ? "The information can be edited" : "Fill in the required information"}
                                                    />
                                                    {selectedData ? (

                                                        <>
                                                            <Tooltip title="Editable">
                                                                <FormControlLabel
                                                                    control={<Switch />}
                                                                    // label="edit"
                                                                    onChange={() => setEditable(!editable)}
                                                                />
                                                            </Tooltip>
                                                        </>) : (
                                                        <></>
                                                    )}

                                                </Box>
                                                <CardContent sx={{ p: '5%' }}>
                                                    <Box sx={{ m: -1.5 }}>
                                                        <Grid
                                                            container
                                                            spacing={3}
                                                        >

                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <TextField
                                                                    fullWidth
                                                                    label="Station Name"
                                                                    name="stationName"
                                                                    InputProps={{
                                                                        readOnly: !editable,
                                                                    }}
                                                                    required
                                                                    value={values.stationName}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={!!touched.stationName && !!errors.stationName}
                                                                    helperText={touched.stationName && errors.stationName}
                                                                /> </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <TextField
                                                                    fullWidth
                                                                    label="Station Location"
                                                                    name="stationLocation"
                                                                    InputProps={{
                                                                        readOnly: !editable,
                                                                    }}
                                                                    required
                                                                    value={values.stationLocation}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={!!touched.stationLocation && !!errors.stationLocation}
                                                                    helperText={touched.stationLocation && errors.stationLocation}
                                                                /> </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <TextField

                                                                    fullWidth
                                                                    label="Station Owner"
                                                                    name="stationOwner"
                                                                    InputProps={{
                                                                        readOnly: !editable,
                                                                    }}
                                                                    required
                                                                    value={values.stationOwner}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={!!touched.stationOwner && !!errors.stationOwner}
                                                                    helperText={touched.stationOwner && errors.stationOwner}
                                                                /> </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <TextField

                                                                    fullWidth
                                                                    label="Fuel Capacity"
                                                                    name="FuelCapacity"
                                                                    InputProps={{
                                                                        readOnly: !editable,
                                                                    }}
                                                                    required
                                                                    value={values.FuelCapacity}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={!!touched.FuelCapacity && !!errors.FuelCapacity}
                                                                    helperText={touched.FuelCapacity && errors.FuelCapacity}
                                                                /> </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <TextField

                                                                    fullWidth
                                                                    label="Current Fuel Amount"
                                                                    name="currentFuelAmount"
                                                                    InputProps={{
                                                                        readOnly: !editable,
                                                                    }}
                                                                    required
                                                                    value={values.currentFuelAmount}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={!!touched.currentFuelAmount && !!errors.currentFuelAmount}
                                                                    helperText={touched.currentFuelAmount && errors.currentFuelAmount}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </CardContent >
                                                <Divider />
                                                <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
                                                    {selectedData ? (

                                                        <>
                                                            <Button variant="contained" type="submit">
                                                                {"Update"}
                                                            </Button>
                                                            <Tooltip title="Delete">
                                                                <Button variant="contained" color="error" onClick={() => SetWarn(true)}>
                                                                    {"Delete"}
                                                                </Button>
                                                            </Tooltip>

                                                        </>) : (
                                                        <> <Button variant="contained" type="submit">
                                                            {"Create"}
                                                        </Button></>
                                                    )}

                                                </CardActions>
                                            </Card>
                                        </Form>)}
                                </Formik >
                            </Grid>

                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Warndialogue
                open={warn}
                setOpen={SetWarn}
                name={name}
                action={deleteStation}
                selectedData={selectedData}
            />
        </>
    )
}

CreateUpdateStation.propTypes = {
    selectedData: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    createOpen: PropTypes.bool.isRequired,
    createUser: PropTypes.func,
    updateUser: PropTypes.func.isRequired,
    setEditable: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

