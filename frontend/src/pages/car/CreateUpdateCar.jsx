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
    Container,
    FormControlLabel,
    Switch,
    Typography,
    Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import CarContext from "../../context/CarContext";
import UserContext from "../../context/UserContext";
import Warndialogue from "src/components/Warndialogue";
import QrCode2Icon from '@mui/icons-material/QrCode2';

function CreateUpdateCar({ selectedData, editable, setEditable }) {
    const { createCar, updateCar, setSelectedData, setCreateOpen, deleteCar, warn, SetWarn, qr,
        setQr, qrId, setQrId } = React.useContext(CarContext);
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
                        {/* <CardHeader
                            title={selectedData ? "Update Car" : "Create Car"}
                        /> */}
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
                                        <Tooltip title="Generate QR Code" sx={{ mr: '5%' }}>
                                            <IconButton size="small" onClick={() => { setQr(true) }}>
                                                <QrCode2Icon size="small" />
                                            </IconButton>
                                        </Tooltip>

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
                            <Box sx={{ flexGrow: 1, mb: '5%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            disabled={!editable}
                                            autoFocus={editable}
                                            variant="standard"
                                            label="Plate Number"
                                            name="plateNumber"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.plateNumber}
                                            error={Boolean(touched.plateNumber && errors.plateNumber)}
                                            helperText={touched.plateNumber && errors.plateNumber}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="standard"
                                            disabled={!editable}
                                            autoFocus={editable}
                                            fullWidth
                                            label="Model"
                                            name="model"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.model}
                                            error={Boolean(touched.model && errors.model)}
                                            helperText={touched.model && errors.model}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            disabled={!editable}
                                            autoFocus={editable}
                                            variant="standard"
                                            label="Make Year"
                                            name="year"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.year}
                                            error={Boolean(touched.year && errors.year)}
                                            helperText={touched.year && errors.year}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            disabled={!editable}
                                            autoFocus={editable}
                                            variant="standard"
                                            label="Color"
                                            name="color"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.color}
                                            error={Boolean(touched.color && errors.color)}
                                            helperText={touched.color && errors.color}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            disabled={!editable}
                                            autoFocus={editable}
                                            variant="standard"
                                            label="Capacity"
                                            name="capacity"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.capacity}
                                            error={Boolean(touched.capacity && errors.capacity)}
                                            helperText={touched.capacity && errors.capacity}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label1">transmission</InputLabel>

                                            <Select
                                                id="demo-simple-select1"
                                                labelId="demo-simple-select-label1"
                                                name="transmission"
                                                disabled={!editable}
                                                autoFocus={editable}
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
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Engine</InputLabel>

                                            <Select
                                                id="demo-simple-select"
                                                labelId="demo-simple-select-label"
                                                name="engine"
                                                disabled={!editable}
                                                autoFocus={editable}
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
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Driver</InputLabel>
                                            <Select
                                                disabled={!editable}
                                                autoFocus={editable}
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
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {editable && (
                                    <Button style={{ backgroundColor: '#4276a8' }}
                                        variant="contained" type="submit" fullWidth>
                                        {selectedData ? "Update" : "Create"}
                                    </Button>
                                )}
                            </Box>
                        </Container>

                    </Form>
                )}
            </Formik>

            <Warndialogue
                open={warn}
                setOpen={SetWarn}
                title={"Delete User"}
                content={"Are you sure you want to delete this user?"}
                action={deleteCar}
                selectedData={selectedData}
                qr={qr}
                setQr={setQr}
                qrId={qrId}
                setQrId={setQrId}
            />
        </>
    );
}

export default CreateUpdateCar;
CreateUpdateCar.propTypes = {
    selectedData: PropTypes.object,
    editable: PropTypes.bool,
    setEditable: PropTypes.func,

};

// <Box spacing={3} direction='row' >
//     <Stack spacing={2} sx={{
//         display: "flex",
//         justifyContent: "flex-end",
//     }}>

//         <TextField
//             fullWidth
//             variant="standard"
//             label="Plate Number"
//             name="plateNumber"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.plateNumber}
//             error={Boolean(touched.plateNumber && errors.plateNumber)}
//             helperText={touched.plateNumber && errors.plateNumber}
//         />
//         <TextField
//             variant="standard"
//             fullWidth
//             label="Model"
//             name="model"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.model}
//             error={Boolean(touched.model && errors.model)}
//             helperText={touched.model && errors.model}
//         />
//         <TextField
//             fullWidth
//             variant="standard"
//             label="Make Year"
//             name="year"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.year}
//             error={Boolean(touched.year && errors.year)}
//             helperText={touched.year && errors.year}
//         />
//         <TextField
//             fullWidth
//             variant="standard"
//             label="Color"
//             name="color"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.color}
//             error={Boolean(touched.color && errors.color)}
//             helperText={touched.color && errors.color}
//         />
//     </Stack>
//     {/* <Box sx={{ flexGrow: 1 }} /> */}
//     <Stack spacing={2} sx={{
//         display: "flex",
//         justifyContent: "flex-end",
//     }}>
//         <TextField
//             fullWidth
//             variant="standard"
//             label="Capacity"
//             name="capacity"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.capacity}
//             error={Boolean(touched.capacity && errors.capacity)}
//             helperText={touched.capacity && errors.capacity}
//         />
//         <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label1">transmission</InputLabel>

//             <Select
//                 id="demo-simple-select1"
//                 labelId="demo-simple-select-label1"
//                 name="transmission"
//                 label="transmission"
//                 variant="standard"
//                 value={values.transmission}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={Boolean(touched.transmission && errors.transmission)}
//                 helpertext={touched.transmission && errors.transmission}
//             >
//                 <MenuItem value="manual">manual</MenuItem>
//                 <MenuItem value="automatic">automatic</MenuItem>
//             </Select>
//         </FormControl>
//         <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">Engine</InputLabel>

//             <Select
//                 id="demo-simple-select"
//                 labelId="demo-simple-select-label"
//                 name="engine"
//                 label="Engine"
//                 variant="standard"
//                 value={values.engine}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={Boolean(touched.engine && errors.engine)}
//                 helpertext={touched.engine && errors.engine}
//             >
//                 <MenuItem value="gasoline">gasoline</MenuItem>
//                 <MenuItem value="diesel">diesel</MenuItem>
//                 <MenuItem value="electric">electric</MenuItem>
//             </Select>
//         </FormControl>
//         <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">Driver</InputLabel>
//             <Select
//                 labelId="demo-simple-select-label"
//                 name="driver"
//                 label="driver"
//                 variant="standard"
//                 value={values?.driver}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.driver && Boolean(errors.driver)}
//                 helpertext={touched.driver && errors.driver}
//             >
//                 {userData?.map((item) => (
//                     <MenuItem key={item._id} value={item._id}>
//                         {item?.userName}
//                     </MenuItem>
//                 ))}

//             </Select>
//         </FormControl>
//     </Stack>
// </Box>