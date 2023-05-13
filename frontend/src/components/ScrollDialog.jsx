import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
import AlertDialog from 'src/components/AlertDialog';
import CollapsibleTable from 'src/components/CollapsibleTable';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScrollDialog({ scanned, setScanned }) {
    const {
        setCreateOpen,
        setEditable,
        fuelDataByCar,
        editCard,
        setEditCard,
        cardRow,
        setCardRow,
    } = React.useContext(FuelContext);

    const handleClose = () => {
        setScanned(false);
    };


    return (

        <Box sx={{ flexGrow: 1, flexWrap: 'wrap', overflow: 'hidden' }}>
            <Dialog
                fullScreen
                open={scanned}
                onClose={handleClose}
                TransitionComponent={Transition}

            >
                <AppBar sx={{ position: 'relative', backgroundColor: '#4276a8', mb: 5, flexWrap: 'wrap' }}>
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
                            Car Details
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={() => {
                            // setCreateOpen(true), setEditable(true);
                            setOpen(true);
                        }}>
                            Add
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <CarDetailsCard fuelDataByCar={fuelDataByCar} editCard={editCard} setEditCard={setEditCard} cardRow={cardRow} setCardRow={setCardRow} />


                {/* <CollapsibleTable fuelDataByCar={fuelDataByCar} /> */}
            </Dialog>
            {/* <AlertDialog open={open} setOpen={setOpen} /> */}

        </Box>
    );
}

ScrollDialog.propTypes = {
    fuelDataByCar: propTypes.array,
    scanned: propTypes.string,
    setScanned: propTypes.func,
};
