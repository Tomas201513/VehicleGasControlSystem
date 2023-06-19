import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from 'src/context/AuthContext';
import CarContext from 'src/context/CarContext';
import StationContext from 'src/context/StationContext';
import UserContext from 'src/context/UserContext';
import ScrollDialog from '../../components/ScrollDialog';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import PropTypes from 'prop-types';

const validationSchema = Yup.object().shape({
  // CarId: Yup.number().min(1, 'Fuel amount must be greater than zero').required('Fuel amount is required')
});

export default function Scan() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { carDetail } = useContext(CarContext);
  const { refetchAccount } = useContext(UserContext);
  const { userDetail } = useContext(AuthContext);
  const { refetchStation } = useContext(StationContext);
  const { setScanned, scanned } = useContext(CarContext);

  useEffect(() => {
    if (userDetail) {
      const fetchData = async () => {
        refetchAccount();
        refetchStation();
      };
      fetchData();
    }
  }, [userDetail]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab fontWeight="bold" label="Qr" />
            <Tab fontWeight="bold" label="Plate No." />
          </Tabs>
        </Box>
        {value === 0 ?
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
                qrCodeSuccessCallback={(decodedText) => {
                  setScanned(decodedText);
                }}
                setScanned={setScanned}
              />
           </Box>
       </Box>
           </TabPanel>
          :
            <TabPanel value={value} index={1}>
              <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Formik initialValues={{ CarId: '' }} validationSchema={validationSchema} onSubmit={(values) => setScanned(values.CarId)}>
                {({ errors, touched, values, handleChange }) => (
                  <Form>
                    <Stack direction="column" spacing={2} sx={{ maxWidth: 300, justifyContent: 'center', alignItems: 'center', mt:6,mb: 6 }}>
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
                        onClick={() => setScanned(values.CarId)}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
          </Box>
            </TabPanel>
        }
      </Box>
      <ScrollDialog carDetail={carDetail} scanned={scanned} setScanned={setScanned} />
    </>
  );
}

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