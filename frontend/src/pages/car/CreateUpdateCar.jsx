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

import CarContext from "../../context/CarContext";
import UserContext from "../../context/UserContext";
import QrCode2Icon from '@mui/icons-material/QrCode2';
function CreateUpdateCar({ selectedData, editable, setEditable }) {
    const { name, createCar, updateCar, setSelectedData, setCreateOpen, deleteCar, warn, SetWarn, qr,
        setQr, qrId, setQrId } = useContext(CarContext);
    const { userData } = useContext(UserContext);
    const drivers = userData.filter(item => item?.roles[0] === 'driver')

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

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: '10%'
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
                                <Box display={"flex"} alignItems={"center"} mb={'5%'}>

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
                                        <Form
                                        // autoComplete="off"
                                        // noValidate
                                        // onSubmit={handleSubmit}
                                        >
                                            <Card const sx={{
                                                flexGrow: 1,
                                                border: "none",
                                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.06)",
                                                borderRadius: "10px",
                                            }}>
                                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={'2%'}>

                                                    <CardHeader
                                                        title={selectedData ? "Update Car" : "Create Car"}
                                                        subheader={selectedData ? "The information can be edited" : "Fill in the required information"}
                                                    />
                                                    {selectedData ? (

                                                        <>
                                                            <Box sx={{ flexGrow: 1 }} />
                                                            <Tooltip title="Generate QR Code" sx={{ mr: '5%' }}>
                                                                <IconButton size="large" onClick={() => { setQr(true) }}>
                                                                    <QrCode2Icon size="large" />
                                                                </IconButton>
                                                            </Tooltip>
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
                                                <CardContent sx={{ pt: 0 }}>
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
                                            InputProps={{
                                                readOnly: !editable,
                                            }}


                                            label="Plate Number"
                                            name="plateNumber"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.plateNumber}
                                            error={Boolean(touched.plateNumber && errors.plateNumber)}
                                            helperText={touched.plateNumber && errors.plateNumber}
                                        />
                                    </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                        <TextField

                                            InputProps={{
                                                readOnly: !editable,
                                            }}

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
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                readOnly: !editable,
                                            }}


                                            label="Make Year"
                                            name="year"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.year}
                                            error={Boolean(touched.year && errors.year)}
                                            helperText={touched.year && errors.year}
                                        />
                                    </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                readOnly: !editable,
                                            }}


                                            label="Color"
                                            name="color"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.color}
                                            error={Boolean(touched.color && errors.color)}
                                            helperText={touched.color && errors.color}
                                        />
                                                            </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                readOnly: !editable,
                                            }}
                                            //

                                            label="Capacity"
                                            name="capacity"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.capacity}
                                            error={Boolean(touched.capacity && errors.capacity)}
                                            helperText={touched.capacity && errors.capacity}
                                        />
                                    </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label1">transmission</InputLabel>

                                            <Select
                                                id="demo-simple-select1"
                                                labelId="demo-simple-select-label1"
                                                name="transmission"
                                                InputProps={{
                                                    readOnly: !editable,
                                                }}
                                                //
                                                label="transmission"

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
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Engine</InputLabel>

                                            <Select
                                                id="demo-simple-select"
                                                labelId="demo-simple-select-label"
                                                name="engine"
                                                InputProps={{
                                                    readOnly: !editable,
                                                }}
                                                label="Engine"

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
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Driver</InputLabel>
                                            <Select
                                                InputProps={{
                                                    readOnly: !editable,
                                                }}
                                                labelId="demo-simple-select-label"
                                                name="driver"
                                                label="driver"

                                                value={values?.driver}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.driver && Boolean(errors.driver)}
                                                helpertext={touched.driver && errors.driver}
                                            >
                                                {drivers?.map((item) => (
                                                    <MenuItem key={item._id} value={item._id}>
                                                        {item?.userName}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
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
                action={deleteCar}
                selectedData={selectedData}
            />
            <Warndialogue
                open={warn}
                setOpen={SetWarn}
                action={deleteCar}
                selectedData={selectedData}
                qr={qr}
                setQr={setQr}
                qrId={qrId}
                setQrId={setQrId}
                name={name}
            />
        </>
    )
}


export default CreateUpdateCar;

CreateUpdateCar.propTypes = {
    selectedData: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    createOpen: PropTypes.bool.isRequired,
    createUser: PropTypes.func,
    updateUser: PropTypes.func.isRequired,
    setEditable: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
}


