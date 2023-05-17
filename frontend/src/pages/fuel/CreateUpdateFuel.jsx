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
import Warndialogue from "src/components/Warndialogue";
import FuelContext from "src/context/FuelContext";
import CarContext from "../../context/CarContext";
import UserContext from "../../context/UserContext";
import StationContext from "../../context/StationContext";


function CreateUpdateFuel({ selectedData, editable, setEditable }) {
    const { createFuel, updateFuel, setSelectedData, setCreateOpen, deleteFuel, warn, SetWarn } = React.useContext(FuelContext);
    const { userData } = React.useContext(UserContext);
    const { carData } = React.useContext(CarContext);
    const { stationData, refetch } = React.useContext(StationContext);
    const drivers = userData.filter(item => item?.roles[0] === 'driver')

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
                await updateFuel({ selectedData: selectedData._id, values });
            } else {
                console.log(values);
                await createFuel(values);
            }
            setEditable(false);
            refetch();
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        console.log('warnnnnnnnnnnnnnnnnnnnnnnnnnn', warn);
        refetch();
    }, [warn])

    return (
        <>
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
                                                // label="edit"
                                                onChange={() => setEditable(!editable)}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => SetWarn(true)}>
                                                <DeleteIcon size="small" color="error" />
                                            </IconButton>

                                        </Tooltip>
                                        {/* <Typography>{'Delete'}</Typography> */}

                                    </>) : (
                                    <></>
                                )}
                            </Box>
                            <CardContent sx={{ pt: 0, mb: '5%' }}>
                                <Stack spacing={3}>
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
                                        variant="standard"
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
                                            InputProps={{
                                                readOnly: !editable,
                                            }}
                                            autoFocus={editable}
                                            value={values.car_id}
                                            variant="standard"
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
                                            InputProps={{
                                                readOnly: !editable,
                                            }}
                                            autoFocus={editable}
                                            onChange={handleChange}
                                            required
                                            value={values.attendant}
                                            variant="standard"
                                            error={Boolean(touched.attendant && errors.attendant)}
                                            helperText={touched.attendant && errors.attendant}
                                        >
                                            {drivers?.map((user) => (
                                                <MenuItem key={user._id} value={user._id}>
                                                    {user?.userName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                            variant="standard"
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        {editable && (
                                            <Button b style={{ backgroundColor: '#4276a8' }}
                                                variant="contained" type="submit" fullWidth>
                                                {selectedData ? "Update" : "Create"}
                                            </Button>
                                        )}
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Container>
                    </Form>
                )}

            </Formik >
            <Warndialogue
                open={warn}
                setOpen={SetWarn}
                title={"Delete User"}
                content={"Are you sure you want to delete this user?"}
                action={deleteFuel}
                selectedData={selectedData}
            />
        </>
    );

}

export default CreateUpdateFuel;
CreateUpdateFuel.propTypes = {
    selectedData: PropTypes.object,
    editable: PropTypes.bool,
    setEditable: PropTypes.func,
};







