import React, { useEffect, useRef, useState, useContext } from 'react';
import QrScanner from 'qr-scanner';
import { Box, Button, Stack } from "@mui/material";
import CarContext from '../../context/CarContext';
import FuelContext from '../../context/FuelContext';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import Html5QrcodePlugin from './Qr';
function Scan() {
    const { carDetail, setScanned, scanned } = useContext(CarContext);
    const { fuelDataByCar } = useContext(FuelContext);


    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setScanned(decodedText);

    };

    // const videoRef = useRef(null);
    // const [cameraOpen, setCameraOpen] = useState(false);

    // useEffect(() => {
    //     let qrScanner;

    //     if (videoRef.current && cameraOpen) {
    //         qrScanner = new QrScanner(videoRef.current, (result) => {
    //             console.log(`result`, result);
    //             setScanned(result);
    //             setCameraOpen(false);
    //             console.log('QR code detected:', result);
    //         });

    //         qrScanner.start();

    //         return () => {
    //             qrScanner.stop();
    //             qrScanner.destroy();
    //         };
    //     }
    // }, [videoRef, cameraOpen]);

    // const handleOpenCamera = () => {
    //     setCameraOpen(!cameraOpen);
    // };
    // if (cameraOpen) {
    //     setScanned(null);
    // }
    return (
        <>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '400px', height: '100%', mt: '10%' }}>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={200}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                        setScanned={setScanned}
                    />
                </Box>
                {JSON.stringify(fuelDataByCar)}
            </Box>
            {/* <Stack direction="column" spacing={'5%'}>

                <Button variant="contained" onClick={handleOpenCamera}>
                    {cameraOpen ? 'Close Camera' : 'Open Camera'}
                </Button>
                {cameraOpen ? (<Box sx={{ width: '200px', height: '100px', margin: 'auto' }}>
                    <video
                        ref={videoRef}
                        style={{ display: cameraOpen ? 'block' : 'none', width: '100%', height: 'auto' }}
                    />
                </Box>) : (<></>)}

                <Box sx={{ width: 'auto', height: 'auto' }}>

                    {scanned && <>{scanned ? (carDetail ? (<>
                        <Typography>CAR DETAIL</Typography>
                        <List>
                            {carDetail.map((propp) => (
                                <ListItem key={propp._id}>
                                    <ListItemText primary={propp.plateNumber} secondary={propp.color} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography>Car Fuel DETAIL</Typography> */}
            {/* <List>
                            {fuelDataByCar.map((prop) => (
                                <ListItem key={prop._id}>
                                    <ListItemText primary={prop.fuelAmount} secondary={prop.fuelDate} />
                                </ListItem>
                            ))}
                        </List> */}
            {/* {JSON.stringify(fuelDataByCar)}

                    </>) : (<>{"no  car with this qrcode"}</>)) : <p>Unabl to Scan a QR code</p>}</>}
                </Box>
            </Stack> */}
        </>
    );
}

export default Scan

    // < Box sx = {{ width: '100px', height: 'auto' }}>

    //     { scanned && <>{scanned ? (carDetail ? (<>
    //         {JSON.stringify(fuelDataByCar)}{<br></br>}{<br></br>}{<br></br>}{JSON.stringify(carDetail)}

    //     </>) : (<>{"no  car with this qrcode"}</>)) : <p>Unabl to Scan a QR code</p>}</>}
    //             </ >