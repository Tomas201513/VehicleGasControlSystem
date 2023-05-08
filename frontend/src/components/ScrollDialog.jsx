import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
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
        setCreateOpen,
        setEditable,
        fuelDataByCar
    } = React.useContext(FuelContext);

    const handleClose = () => {
        setScanned(false);
    };

    return (

        <div>
            <Dialog
                fullScreen
                open={scanned}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: '#4276a8' }}>
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
                        </Typography>
                        <Button autoFocus color="inherit" onClick={() => {
                            setCreateOpen(true), setEditable(true);
                        }}>
                            Add
                        </Button>
                    </Toolbar>
                </AppBar>
                <CarDetailsCard fuelDataByCar={fuelDataByCar} />
            </Dialog>
        </div>
    );
}

ScrollDialog.propTypes = {
    fuelDataByCar: propTypes.array,
    scanned: propTypes.string,
    setScanned: propTypes.func,
};
