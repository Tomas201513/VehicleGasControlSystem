import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import propTypes from 'prop-types';
import FuelContext from 'src/context/FuelContext';
import CarDetailsCard from 'src/components/CarDetailsCard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScrollDialog({ scanned, setScanned }) {
    const {
        fuelDataByCar,
        editCard,
        setEditCard,
        cardRow,
        setCardRow,
         refetchByCar
    } = React.useContext(FuelContext);

    const handleClose = () => {
        setScanned(null);
    };


    return (

        <Box sx={{ flexGrow: 1, flexWrap: 'wrap', overflow: 'hidden' }}>
            <Dialog
                fullScreen
                open={scanned}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: 'primary.main', mb: '5%', flexWrap: 'wrap' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            CAR DETAILS
                        </Typography>
                    </Toolbar>
                </AppBar>
                <CarDetailsCard
                    fuelDataByCar={fuelDataByCar}
                    editCard={editCard}
                    setEditCard={setEditCard}
                    cardRow={cardRow}
                    setCardRow={setCardRow}
                    scanned={scanned} 
                    />
            </Dialog>
        </Box>
    );
}

ScrollDialog.propTypes = {
    fuelDataByCar: propTypes.array,
    scanned: propTypes.string,
    setScanned: propTypes.func,
};
