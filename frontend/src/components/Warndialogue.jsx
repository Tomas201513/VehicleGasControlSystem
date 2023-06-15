import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import propTypes from 'prop-types';
import QRcode from './QRcode';
import StationContext from 'src/context/StationContext';
import FuelContext from '../context/FuelContext';
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

export default function Warndialogue({  name, open, setOpen, action,setSelectedData, selectedData,selectedRows,setSelectedRows, qr, setQr, qrId,
    setQrId }) {
    const { refetch: refetchStation } = React.useContext(StationContext);
    const { refetch: refetchFuel } = React.useContext(FuelContext);


    const handleClose = () => {
        setOpen(false);
        try{

            setSelectedData(null);
            setSelectedRows([]);
            // refetch();
            refetchFuel();
            refetchStation();
        } catch(e){
            // console.log(e);
        }
        try{

            setQr(false);
            setQrId(null);
        }catch(e){
            // console.log(e);
        }
    };

    return (
        <div>
            <Dialog
                open={open || qr || qrId}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {qr ? "QR Code" : <>{`Delete ${name} `}</>}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {qr ? qrId ? <QRcode id={qrId} /> : <QRcode id={selectedData?._id} /> : <> {`Are you sure you want to delete this ${name}?`}</>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {qr ? <></> : <Button autoFocus onClick={() => { console.log('selectedData',selectedData); action(selectedData ? selectedData._id: selectedRows); handleClose() }} color="error">
                        Delete
                    </Button>}

                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

Warndialogue.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    action: propTypes.func.isRequired,
    selectedData: propTypes.object.isRequired,
    qr: propTypes.bool.isRequired,
    setQr: propTypes.func.isRequired,
    qrId: propTypes.string.isRequired,
    setQrId: propTypes.func.isRequired,
    name: propTypes.string.isRequired
};

// {
//     selectedData ?
//         <QRcode id={selectedData?._id} /> : <></>
// }
