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
import CarContext from "../../context/CarContext";

function CreateUpdateCar({ selectedData, editable, setEditable }) {
    const { createCar, updateCar } = React.useContext(CarContext);
    const FormSchema = yup.object().shape({
        plateNumber: yup.string().required("Plate Number is required"),
        model: yup.string().required("Model is required"),
        year: yup.string().required("Year is required"),
        color: yup.string().required("Color is required"),
        capacity: yup.string().required("Capacity is required"),
        transmission: yup.string().required("Transmission is required"),
        engine: yup.string().required("Engine is required"),
        driver: yup.string().required("Driver is required"),
    });

    const handleSubmit = async (values) => {
        try {
            if (selectedData) {
                await updateCar({ selectedData: selectedData._id, values });
            } else {
                await createCar(values);
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
                    plateNumber: selectedData?.plateNumber || "",
                    model: selectedData?.model || "",
                    year: selectedData?.year || "",
                    color: selectedData?.color || "",
                    capacity: selectedData?.capacity || "",
                    transmission: selectedData?.transmission || "",
                    engine: selectedData?.engine || "",
                    driver: selectedData?.driver || "",
                }}
                validationSchema={FormSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <CardHeader
                            title={selectedData ? "Update Car" : "Create Car"}
                        />
                        <CardContent>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Plate Number"
                                    name="plateNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.plateNumber}
                                    error={Boolean(touched.plateNumber && errors.plateNumber)}
                                    helperText={touched.plateNumber && errors.plateNumber}
                                />
                                <TextField

                                    fullWidth
                                    label="Model"
                                    name="model"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.model}
                                    error={Boolean(touched.model && errors.model)}
                                    helperText={touched.model && errors.model}
                                />
                                <TextField
                                    fullWidth
                                    label="Year"
                                    name="year"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.year}
                                    error={Boolean(touched.year && errors.year)}
                                    helperText={touched.year && errors.year}
                                />
                                <TextField
                                    fullWidth
                                    label="Color"
                                    name="color"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.color}
                                    error={Boolean(touched.color && errors.color)}
                                    helperText={touched.color && errors.color}
                                />
                                <TextField
                                    fullWidth
                                    label="Capacity"
                                    name="capacity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.capacity}
                                    error={Boolean(touched.capacity && errors.capacity)}
                                    helperText={touched.capacity && errors.capacity}
                                />
                                <TextField
                                    fullWidth
                                    label="Transmission"
                                    name="transmission"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.transmission}
                                    error={Boolean(touched.transmission && errors.transmission)}
                                    helperText={touched.transmission && errors.transmission}
                                />
                                <TextField
                                    fullWidth
                                    label="Engine"
                                    name="engine"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.engine}
                                    error={Boolean(touched.engine && errors.engine)}
                                    helperText={touched.engine && errors.engine}
                                />
                                <TextField

                                    fullWidth
                                    label="Driver"
                                    name="driver"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.driver}
                                    error={Boolean(touched.driver && errors.driver)}
                                    helperText={touched.driver && errors.driver}
                                />
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

CreateUpdateCar.propTypes = {
    selectedData: PropTypes.object,
    editable: PropTypes.bool,
    setEditable: PropTypes.func,
};

