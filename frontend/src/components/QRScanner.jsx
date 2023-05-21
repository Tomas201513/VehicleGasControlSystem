import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Box, Button, Stack } from "@mui/material";

function QRScanner() {
    const videoRef = useRef(null);
    const [result, setResult] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);

    useEffect(() => {
        let qrScanner;

        if (videoRef.current && cameraOpen) {
            qrScanner = new QrScanner(videoRef.current, (result) => {
                setResult(result);
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

    return (
        <>
            <Stack direction="row" spacing={2}>
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
                {/* )} */}
            </Stack>
            {result && <p>QR code detected: {result}</p>}
        </>
    );
}

export default QRScanner;