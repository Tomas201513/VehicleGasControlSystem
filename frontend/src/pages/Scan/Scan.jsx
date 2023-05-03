import React, { useEffect, useRef, useState, useContext } from 'react';
import QrScanner from 'qr-scanner';
import { Box, Button, Stack } from "@mui/material";
import CarContext from '../../context/CarContext';

function Scan() {
    const { carDetail, setScanned, scanned } = useContext(CarContext);
    const videoRef = useRef(null);
    const [cameraOpen, setCameraOpen] = useState(false);

    useEffect(() => {
        let qrScanner;

        if (videoRef.current && cameraOpen) {
            qrScanner = new QrScanner(videoRef.current, (result) => {
                console.log(`result`, result);
                setScanned(result);
                setCameraOpen(false);
                console.log('QR code detected:', result);
            });

            qrScanner.start();

            return () => {
                qrScanner.stop();
                qrScanner.destroy();
            };
        }
    }, [videoRef, cameraOpen]);

    const handleOpenCamera = () => {
        setCameraOpen(!cameraOpen);
    };
    if (cameraOpen) {
        setScanned(null);
    }
    return (
        <>
            <Stack direction="column" spacing={15}>
                <Box sx={{ width: '100%', height: 'auto', maxWidth: '500px' }}>
                    <video
                        ref={videoRef}
                        style={{ display: cameraOpen ? 'block' : 'none', width: '100%', height: 'auto' }}
                    />
                </Box>
                {/* {!cameraOpen && ( */}
                <Button variant="contained" onClick={handleOpenCamera}>
                    {cameraOpen ? 'Close Camera' : 'Open Camera'}
                </Button>
                <Box sx={{ width: '100%', height: 'auto', maxWidth: '500px' }}>
                    {cameraOpen || carDetail && JSON.stringify(carDetail)}
                </Box>
            </Stack>
        </>
    );
}

export default Scan