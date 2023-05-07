import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import propTypes from 'prop-types';
import FuelContext from 'src/context/FuelContext';

export default function ScrollDialog({ carDetail, scanned, setScanned }) {
    const { fuelDataByCar } = React.useContext(FuelContext);
    const [scroll, setScroll] = React.useState('paper');
    console.log('ooooooooooooooooo');
    const handleClose = (reason) => {
        // setOpen(false);
        setScanned(false);
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        console.log(fuelDataByCar)
        // setOpen(fuelDataByCar?.length > 0 ? true : false);
        // setScanned(false);
        // if (open) {
        //     const { current: descriptionElement } = descriptionElementRef;
        //     if (descriptionElement !== null) {
        //         descriptionElement.focus();
        //     }
        // }
    }, []);

    return (
        <div>
            <Dialog
                open={scanned}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {JSON.stringify(carDetail)}
                        {JSON.stringify(fuelDataByCar)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ScrollDialog.propTypes = {
    fuelDataByCar: propTypes.array,
    carDetail: propTypes.object,
    scanned: propTypes.string,
    setScanned: propTypes.func,
};
