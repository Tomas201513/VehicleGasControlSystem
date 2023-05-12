import React from "react";
import {
    Button,
    Stack,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CardContent,
    CardHeader,
    Box,
    IconButton,
    Tooltip,
    FormControlLabel,
    Switch,
    Container,
    Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import Warnialogue from "src/components/Warnialogue";
import StationContext from "src/context/StationContext";

export default function CreateUpdateStation({ selectedData, editable, setEditable }) {

    const { createStation, updateStation, setSelectedData, setCreateOpen, deleteStation, warn, SetWarn } = React.useContext(StationContext);

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
                await updateStation({ selectedData: selectedData._id, values });
            } else {
                console.log(values);
                await createStation(values);
            }
            setEditable(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
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
                        <Container maxWidth="md" sx={{ marginTop: "13vh", maxWidth: 600 }}>

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
                                <Box sx={{ flexGrow: 1 }} />
                                {selectedData ? (

                                    <>
                                        <Tooltip title="Editable">
                                            <FormControlLabel
                                                control={<Switch />}
                                                label="edit"
                                                onChange={() => setEditable(!editable)}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => SetWarn(true)}>
                                                <DeleteIcon size="small" color="error" />
                                            </IconButton>

                                        </Tooltip>
                                        <Typography>{'Delete'}</Typography>

                                    </>) : (
                                    <></>
                                )}
                            </Box>
                            <CardContent>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Station Name"
                                        name="stationName"
                                        value={values.stationName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.stationName && !!errors.stationName}
                                        helperText={touched.stationName && errors.stationName}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Station Location"
                                        name="stationLocation"
                                        value={values.stationLocation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.stationLocation && !!errors.stationLocation}
                                        helperText={touched.stationLocation && errors.stationLocation}
                                    />
                                    <TextField

                                        fullWidth
                                        label="Station Owner"
                                        name="stationOwner"
                                        value={values.stationOwner}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.stationOwner && !!errors.stationOwner}
                                        helperText={touched.stationOwner && errors.stationOwner}
                                    />
                                    <TextField

                                        fullWidth
                                        label="Fuel Capacity"
                                        name="FuelCapacity"
                                        value={values.FuelCapacity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.FuelCapacity && !!errors.FuelCapacity}
                                        helperText={touched.FuelCapacity && errors.FuelCapacity}
                                    />
                                    <TextField

                                        fullWidth
                                        label="Current Fuel Amount"
                                        name="currentFuelAmount"
                                        value={values.currentFuelAmount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={!!touched.currentFuelAmount && !!errors.currentFuelAmount}
                                        helperText={touched.currentFuelAmount && errors.currentFuelAmount}
                                    />
                                </Stack>
                            </CardContent>
                            <Box

                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    p: 2,
                                }}
                            >
                                <Button

                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    {selectedData ? "Update" : "Create"}
                                </Button>
                            </Box>
                        </Container>
                    </Form>
                )}
            </Formik>
            <Warnialogue
                open={warn}
                setOpen={SetWarn}
                title={"Delete User"}
                content={"Are you sure you want to delete this user?"}
                action={deleteStation}
                selectedData={selectedData}
            />
        </>
    );
}

CreateUpdateStation.propTypes = {
    selectedData: PropTypes.object,
    editable: PropTypes.bool,
    setEditable: PropTypes.func,
};



