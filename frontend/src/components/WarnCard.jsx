
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
import FuelContext from "src/context/FuelContext";

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

export default function WarnCard({ open, setOpen, title, content, action, cardRow, setCardRow,
}) {
    const { refetchByCar, refetch } = React.useContext(FuelContext);

    const handleClose = () => {
        refetchByCar();
        refetch();
        setOpen(false);
        setCardRow(null);

    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {<Button autoFocus onClick={() => {
                        console.log(cardRow);
                        action(cardRow?._id);
                        handleClose();
                    }} color="error">
                        Delete
                    </Button>}

                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

WarnCard.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
    action: propTypes.func.isRequired,
    setCardRow: propTypes.func.isRequired,
    cardRow: propTypes.object.isRequired,

};

// {
//     selectedData ?
//         <QRcode id={selectedData?._id} /> : <></>
// }
