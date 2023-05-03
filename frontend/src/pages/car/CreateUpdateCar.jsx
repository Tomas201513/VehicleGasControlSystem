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
import QRcodeCode from "src/components/QRcodeCode";
import CarContext from "../../context/CarContext";
import UserContext from "../../context/UserContext";

function CreateUpdateCar({ selectedData, editable, setEditable }) {
    const { createCar, updateCar } = React.useContext(CarContext);
    const { userData } = React.useContext(UserContext);

    const FormSchema = yup.object().shape({
        plateNumber: yup.string().required("Plate Number is required"),
        model: yup.number().required("Model is required"),
        year: yup.string().required("Year is required"),
        color: yup.string().required("Color is required"),
        capacity: yup.number().required("Capacity is required"),
        transmission: yup.string().required("transmission is required"),
        engine: yup.string().required("Engine is required"),
        driver: yup.string().required("driver is required"),
    });

    const handleSubmit = async (values) => {
        try {
            if (selectedData) {
                await updateCar({ selectedData: selectedData._id, values });
            } else {
                console.log(values);
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
                    driver: selectedData?.driver?._id || "",
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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">transmission</InputLabel>

                                    <Select
                                        id="demo-simple-select1"
                                        labelId="demo-simple-select-label1"
                                        name="transmission"
                                        label="transmission"
                                        variant="standard"
                                        value={values.transmission}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.transmission && errors.transmission)}
                                        helpertext={touched.transmission && errors.transmission}
                                    >
                                        <MenuItem value="manual">manual</MenuItem>
                                        <MenuItem value="automatic">automatic</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Engine</InputLabel>

                                    <Select
                                        id="demo-simple-select"
                                        labelId="demo-simple-select-label"
                                        name="engine"
                                        label="Engine"
                                        variant="standard"
                                        value={values.engine}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.engine && errors.engine)}
                                        helpertext={touched.engine && errors.engine}
                                    >
                                        <MenuItem value="gasoline">gasoline</MenuItem>
                                        <MenuItem value="diesel">diesel</MenuItem>
                                        <MenuItem value="electric">electric</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Driver</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name="driver"
                                        label="driver"
                                        variant="standard"
                                        value={values?.driver}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.driver && Boolean(errors.driver)}
                                        helpertext={touched.driver && errors.driver}
                                    >
                                        {userData?.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item?.userName}
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
            <QRcodeCode id={selectedData?._id} />
        </>
    );
}

export default CreateUpdateCar;
CreateUpdateCar.propTypes = {
    selectedData: PropTypes.object,
    editable: PropTypes.bool,
    setEditable: PropTypes.func,
};

