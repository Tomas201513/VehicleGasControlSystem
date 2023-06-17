import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import propTypes from 'prop-types';
import FuelContext from 'src/context/FuelContext';
import {
    Stack,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CardContent,
    Box,
    Container,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import CarContext from 'src/context/CarContext';
import UserContext from 'src/context/UserContext';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import AuthContext from '/src/context/AuthContext'
import StationContext from 'src/context/StationContext';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function EditFuelDialogue({ open, setOpen, editCard, setEditCard, scanned }) {
    const { userData, } = React.useContext(UserContext);
    const { carData } = React.useContext(CarContext);
    const { createFuel, updateFuel, fuelDataByCar, createFuelAttendant, cardRow, setCardRow, refetchByCar } = React.useContext(FuelContext);
    const { userDetail } = React.useContext(AuthContext);
    const { stationData } = React.useContext(StationContext);
    const FormSchema = yup.object().shape({
        fuelAmount: yup.number().required("fuel amount is required"),
        // fuelDate: yup.date().required("date is required"),
        // car_id: yup.string().required("car id is required"),
        // attendant: yup.string().required("attendant is required"),
        station: yup.string().required("station is required"),
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCardRow(null);
        refetchByCar();
    };
    const handleSubmit = async (values) => {
        try {
            if (cardRow) {
                // console.log('updateFuel', { cardRow: cardRow._id, scanned, attendant: userDetail._id, values });
                await updateFuel({ cardRow: cardRow._id, scanned, attendant: userDetail._id, values });
            } else {
                // console.log('0000000000000000000000000', { scanned, attendant: userDetail._id, values });
                await createFuelAttendant({ scanned, attendant: userDetail._id, values });
            }
            handleClose();
        } catch (error) {
            // console.log(error);
        }
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" sx={[{ cursor: 'move' }, { display: 'flex', justifyContent: 'center' }]}>
                    {"Create Fuel"}
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            fuelAmount: cardRow?.fuelAmount || "",
                            car_id: cardRow?.car_id || "",
                            attendant: cardRow?.attendant || "",
                            station: cardRow?.station || "",
                        }}
                        validationSchema={FormSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form>
                                <Container maxWidth="md" sx={{ maxWidth: 600 }}>
                                    <CardContent >
                                        <Stack spacing={3}>
                                            <TextField
                                                fullWidth
                                                label="Fuel Amount"
                                                name="fuelAmount"
                                                onChange={handleChange}
                                                required
                                                value={values.fuelAmount}
                                                variant="standard"
                                                error={Boolean(touched.fuelAmount && errors.fuelAmount)}
                                                helperText={touched.fuelAmount && errors.fuelAmount}
                                            />

                                            {/* <FormControl fullWidth>
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
                                                    onChange={handleChange}
                                                    required
                                                    value={values.attendant}
                                                    variant="standard"
                                                    error={Boolean(touched.attendant && errors.attendant)}
                                                    helperText={touched.attendant && errors.attendant}
                                                >
                                                    {userData?.map((user) => (
                                                        <MenuItem key={user._id} value={user._id}>
                                                            {user?.userName}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl> */}
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label2">
                                                    Station
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label2"
                                                    id="demo-simple-select2"
                                                    name="station"
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
                                        </Stack>
                                    </CardContent>
                                </Container>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}>
                                    <Button type="submit" sx={{ mr: 3 }}>
                                        {editCard ? "Update" : "Create"}
                                    </Button>
                                    <Button onClick={() => { handleClose(); setEditCard(false); setCardRow(null); }} color="error">
                                        {"Cancel"}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik >
                </DialogContent>
            </Dialog>
        </div>
    );
}

EditFuelDialogue.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired,
    carId: propTypes.string.isRequired,
    setCarId: propTypes.func.isRequired,
    editCard: propTypes.bool.isRequired,
    setEditCard: propTypes.func.isRequired,
    cardRow: propTypes.object.isRequired,
    setCardRow: propTypes.func.isRequired,
    scanned: propTypes.string.isRequired,
};