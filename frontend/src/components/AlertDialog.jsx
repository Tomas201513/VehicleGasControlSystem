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

export default function AlertDialog({ open, setOpen, editCard, setEditCard, }) {
    const { userData } = React.useContext(UserContext);
    const { carData } = React.useContext(CarContext);
    const { createFuel, fuelDataByCar, cardRow, setCardRow, } = React.useContext(FuelContext);
    const { userDetail } = React.useContext(AuthContext);
    const FormSchema = yup.object().shape({
        fuelAmount: yup.number().required("fuel amount is required"),
        // fuelDate: yup.date().required("date is required"),
        car_id: yup.string().required("car id is required"),
        attendant: yup.string().required("attendant is required"),
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (values) => {
        try {
            console.log(values);
            await createFuel(values);
            setOpen(false);
        } catch (error) {
            console.log(error);
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
                            car_id: fuelDataByCar?.car?._id || "",
                            attendant: userDetail?._id || "",
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
                                                    disabled={true}
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
                                                    disabled={true}
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
                                        {"Create"}
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

AlertDialog.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired,
    carId: propTypes.string.isRequired,
    setCarId: propTypes.func.isRequired,
    editCard: propTypes.bool.isRequired,
    setEditCard: propTypes.func.isRequired,
    cardRow: propTypes.object.isRequired,
    setCardRow: propTypes.func.isRequired,
};