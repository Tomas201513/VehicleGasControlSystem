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

export default function Warndialogue({ open, setOpen, title, content, action, selectedData, qr, setQr, qrId,
    setQrId }) {

    const handleClose = () => {
        setOpen(false);
        setQr(false);
        setQrId(null);
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
                    {qr ? "QR Code" : title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {qr ? qrId ? <QRcode id={qrId} /> : <QRcode id={selectedData?._id} /> : content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {qr ? <></> : <Button autoFocus onClick={() => { console.log(selectedData); action(selectedData._id); handleClose() }} color="error">
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
    content: propTypes.string.isRequired,
    action: propTypes.func.isRequired,
    selectedData: propTypes.object.isRequired,
    qr: propTypes.bool.isRequired,
    setQr: propTypes.func.isRequired,
    qrId: propTypes.string.isRequired,
    setQrId: propTypes.func.isRequired,
};

// {
//     selectedData ?
//         <QRcode id={selectedData?._id} /> : <></>
// }
