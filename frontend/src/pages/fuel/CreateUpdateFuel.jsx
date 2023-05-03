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
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import FuelContext from "src/context/FuelContext";
import CarContext from "../../context/CarContext";
import UserContext from "../../context/UserContext";


function CreateUpdateFuel({ selectedData, editable, setEditable }) {
    const { createFuel, updateFuel } = React.useContext(FuelContext);
    const { userData } = React.useContext(UserContext);
    const { carData } = React.useContext(CarContext);

    const FormSchema = yup.object().shape({
        fuelAmount: yup.number().required("fuel amount is required"),
        // fuelDate: yup.date().required("date is required"),
        car_id: yup.string().required("car id is required"),
        attendant: yup.string().required("attendant is required"),
    })
    const handleSubmit = async (values) => {
        try {
            if (selectedData) {
                await updateFuel({ selectedData: selectedData._id, values });
            } else {
                console.log(values);
                await createFuel(values);
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
                    fuelAmount: selectedData?.fuelAmount || "",
                    car_id: selectedData?.car_id?._id || "",
                    attendant: selectedData?.attendant?._id || "",
                }}
                validationSchema={FormSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <CardHeader

                            title={selectedData ? "Update Fuel" : "Create Fuel"}
                        />
                        <CardContent>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Fuel Amount"
                                    name="fuelAmount"
                                    onChange={handleChange}
                                    required
                                    value={values.fuelAmount}
                                    variant="outlined"
                                    error={Boolean(touched.fuelAmount && errors.fuelAmount)}
                                    helperText={touched.fuelAmount && errors.fuelAmount}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Car
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="car_id"
                                        onChange={handleChange}
                                        required
                                        value={values.car_id}
                                        variant="outlined"
                                        error={Boolean(touched.car_id && errors.car_id)}
                                        helperText={touched.car_id && errors.car_id}
                                    >
                                        {carData?.map((car) => (
                                            <MenuItem key={car._id} value={car._id}>
                                                {car?.plateNumber}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">
                                        Attendant
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        name="attendant"
                                        onChange={handleChange}
                                        required
                                        value={values.attendant}
                                        variant="outlined"
                                        error={Boolean(touched.attendant && errors.attendant)}
                                        helperText={touched.attendant && errors.attendant}
                                    >
                                        {userData?.map((user) => (
                                            <MenuItem key={user._id} value={user._id}>
                                                {user?.userName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
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
                            </Stack>
                        </CardContent>
                    </Form>
                )}

            </Formik>
        </>
    );

}

export default CreateUpdateFuel;
CreateUpdateFuel.propTypes = {
    selectedData: PropTypes.object,
    editable: PropTypes.bool,
    setEditable: PropTypes.func,
};







