import React, { useContext } from 'react';
import {
    Box,
    Tab,
    Tabs,
    Typography,
    TextField,
    Button,
    Stack
} from "@mui/material";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import CarContext from '../../context/CarContext';
import UserContext from 'src/context/UserContext';
import AuthContext from 'src/context/AuthContext';
import StationContext from 'src/context/StationContext';
import ScrollDialog from '../../components/ScrollDialog';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function Scan() {
    const [value, setValue] = React.useState(0);

    const validationSchema = Yup.object().shape({
        // CarId: Yup.number().min(1, 'Fuel amount must be greater than zero').required('Fuel amount is required')
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const { carDetail, setScanned, scanned } = useContext(CarContext);
    const { refetchAccount } = useContext(UserContext);
    const { userDetail } = React.useContext(AuthContext);
    const { refetchStation } = React.useContext(StationContext);

    const handleSubmit = (CarId) => {
        // console.log('CarId', CarId);
        setScanned(CarId);
    };
    const onNewScanResult = (decodedText, decodedResult) => {
        // console.log(`Scan result: ${decodedText}`, decodedResult);
        setScanned(decodedText);
    };
    React.useEffect(() => {
        if (userDetail) {
            // console.log('userDetail', userDetail);
            const fetchData = async () => {
                refetchAccount();
                refetchStation();
            };
            fetchData();
        }
    }, [userDetail]);
    return (
        <>
            <Box sx={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab fontWeight="bold"
                            label="Camera" {...a11yProps(0)} />
                        <Tab fontWeight="bold" label="Input" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{
                            width: '400px', height: '100%', mt: '5%', flexGrow: 1,
                            border: "none",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.06)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            '&:hover': {
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            }
                        }}>
                            <Html5QrcodePlugin
                                fps={10}
                                qrbox={200}
                                disableFlip={false}
                                qrCodeSuccessCallback={onNewScanResult}
                                setScanned={setScanned}
                            />
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Formik initialValues={{ CarId: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ errors, touched, values, handleChange }) => (
                            <Form>
                                <Stack direction="column" spacing={2} sx={{ maxWidth: 300, justifyContent: 'center', alignItems: 'center', mt: 12 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Plate Number"
                                        name="CarId"
                                        onChange={handleChange}
                                        required
                                        value={values.CarId}
                                        error={Boolean(touched.CarId && errors.CarId)}
                                        helperText={touched.CarId && errors.CarId}
                                    />

                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={() => handleSubmit(values?.CarId)}>
                                        Submit
                                    </Button>
                                </Stack>

                            </Form>
                        )}
                    </Formik>
                </TabPanel>
            </Box>
            <ScrollDialog carDetail={carDetail} scanned={scanned} setScanned={setScanned} />
        </>
    );
}

