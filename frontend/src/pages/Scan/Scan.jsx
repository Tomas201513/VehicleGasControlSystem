import React, { useContext } from 'react';
import { Box, } from "@mui/material";
import CarContext from '../../context/CarContext';
import ScrollDialog from '../../components/ScrollDialog';
import Html5QrcodePlugin from './Html5QrcodePlugin';
function Scan() {
    const { carDetail, setScanned, scanned } = useContext(CarContext);

    const onNewScanResult = (decodedText, decodedResult) => {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setScanned(decodedText);
    };

    return (
        <>
            {/* {createOpen ? <CreateUpdateFuel selectedData={fuelDataByCar} editable={true} setEditable={setEditable} /> : <> */}
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
            </Box>
            <ScrollDialog carDetail={carDetail} scanned={scanned} setScanned={setScanned} />
            {/* </>} */}
        </>
    );
}

export default Scan