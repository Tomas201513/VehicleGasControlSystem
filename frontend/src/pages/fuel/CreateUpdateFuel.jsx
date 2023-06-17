import { useContext, useEffect } from 'react';
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
import FuelContext from "src/context/FuelContext";
import UserContext from "../../context/UserContext";
import StationContext from "../../context/StationContext";

function CreateUpdateFuel({ selectedData, editable, setEditable }) {
    const { name, createFuel, updateFuel, setSelectedData, setCreateOpen, deleteFuel, warn, SetWarn } = useContext(FuelContext);
    const { userData } = useContext(UserContext);
    const { carData } = useContext(CarContext);
    const { stationData, refetch } = useContext(StationContext);
    const attendant = userData.filter(item => item?.roles[0] === 'attendant')

    const FormSchema = yup.object().shape({
        fuelAmount: yup.number().required("fuel amount is required"),
        // fuelDate: yup.date().required("date is required"),
        car_id: yup.string().required("car id is required"),
        attendant: yup.string().required("attendant is required"),
        station: yup.string().required("station is required"),
    })
    const handleSubmit = async (values) => {
        try {
            if (selectedData) {
                // console.log('xxxxxxxxxxx', selectedData._id);
                await updateFuel({ cardRow: selectedData?._id, values });
            } else {
                // console.log(values);
                await createFuel(values);
            }
            setEditable(false);
        } catch (error) {
            // console.log(error);
        }
    }
    useEffect(() => {
        // console.log('warnnnnnnnnnnnnnnnnnnnnnnnnnn', warn);
    }, [warn])

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: '10%',
                    ml: '5%',
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
                                        fuelAmount: selectedData?.fuelAmount || "",
                                        car_id: selectedData?.car_id?._id || "",
                                        attendant: selectedData?.attendant?._id || "",
                                        station: selectedData?.station?._id || "",
                                    }}
                                    validationSchema={FormSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ errors, touched, values, handleChange }) => (
                                        <Form>
                                            {/* <CardHeader

                            title={selectedData ? "Update Fuel" : "Create Fuel"}
                        /> */}
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
                                                        title={selectedData ? "Update Fuel" : "Create Fuel"}
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
                                                                    label="Fuel Amount"
                                                                    name="fuelAmount"
                                                                    InputProps={{
                                                                        readOnly: !editable,
                                                                    }}
                                                                    autoFocus={editable}
                                                                    onChange={handleChange}
                                                                    required
                                                                    value={values.fuelAmount}

                                                                    error={Boolean(touched.fuelAmount && errors.fuelAmount)}
                                                                    helperText={touched.fuelAmount && errors.fuelAmount}
                                                                /> </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >

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
                                                                        InputProps={{
                                                                            readOnly: !editable,
                                                                        }}
                                                                        autoFocus={editable}
                                                                        value={values.car_id}

                                                                        error={Boolean(touched.car_id && errors.car_id)}
                                                                        helperText={touched.car_id && errors.car_id}
                                                                    >
                                                                        {carData?.map((car) => (
                                                                            <MenuItem key={car._id} value={car._id}>
                                                                                {car?.plateNumber}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl> </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <FormControl fullWidth>
                                                                    <InputLabel id="demo-simple-select-label1">
                                                                        Attendant
                                                                    </InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label1"
                                                                        id="demo-simple-select1"
                                                                        name="attendant"
                                                                        InputProps={{
                                                                            readOnly: !editable,
                                                                        }}
                                                                        autoFocus={editable}
                                                                        onChange={handleChange}
                                                                        required
                                                                        value={values.attendant}

                                                                        error={Boolean(touched.attendant && errors.attendant)}
                                                                        helperText={touched.attendant && errors.attendant}
                                                                    >
                                                                        {attendant?.map((user) => (
                                                                            <MenuItem key={user._id} value={user._id}>
                                                                                {user?.userName}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl> </Grid>
                                                            <Grid
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <FormControl fullWidth>
                                                                    <InputLabel id="demo-simple-select-label2">
                                                                        Station
                                                                    </InputLabel>
                                                                    <Select

                                                                        labelId="demo-simple-select-label2"
                                                                        id="demo-simple-select2"
                                                                        name="station"
                                                                        InputProps={{
                                                                            readOnly: !editable,
                                                                        }}
                                                                        autoFocus={editable}
                                                                        onChange={handleChange}
                                                                        required
                                                                        value={values.station}

                                                                        error={Boolean(touched.station && errors.station)}
                                                                        helperText={touched.station && errors.station}
                                                                    >
                                                                        {stationData?.map((station) => (
                                                                            <MenuItem key={station._id} value={station._id}>
                                                                                {station?.stationName}
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
                action={deleteFuel}
                selectedData={selectedData}
            />
        </>
    )
}

export default CreateUpdateFuel;
CreateUpdateFuel.propTypes = {
    selectedData: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    createOpen: PropTypes.bool.isRequired,
    createUser: PropTypes.func,
    updateUser: PropTypes.func.isRequired,
    setEditable: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};







