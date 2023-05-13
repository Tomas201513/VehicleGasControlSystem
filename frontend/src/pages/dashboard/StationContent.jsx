import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    LinearProgress,
    Stack,
    SvgIcon,
    Typography,
    linearProgressClasses,
    styled
} from '@mui/material';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';


function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};
export default function StationContent(props) {

    const { stationData = [], sx } = props;

    return (
        <>
            {stationData.length > 1 ?

                <Card sx={sx} >
                    <CardContent>
                        <Stack spacing={1} direction="column" alignItems="left">
                            {stationData.map((userCount) => (

                                <Stack
                                    alignItems="flex-start"
                                    direction="row"
                                    justifyContent="space-between"
                                    spacing={3}
                                    key={userCount._id}
                                >
                                    {/* <Stack spacing={1}> */}
                                    <Typography
                                        color="text.secondary"
                                        variant="overline"
                                    >
                                        {userCount.stationName}
                                    </Typography>
                                    <Typography variant="h6" >

                                        {(userCount.currentFuelAmount).toFixed(2)}L / {userCount.FuelCapacity}L
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    {/* </Stack> */}
                                    <CircularProgressWithLabel value={userCount.currentFuelAmount / userCount.FuelCapacity * 100} />
                                </Stack>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
                :
                <Card sx={sx}>
                    <CardContent>
                        <Stack
                            alignItems="flex-start"
                            direction="row"
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Stack spacing={1}>
                                <Typography
                                    color="text.secondary"
                                    variant="overline"
                                >
                                    {stationData[0].stationName}

                                </Typography>
                                <Typography variant="h4">
                                    {(stationData[0].currentFuelAmount)}L
                                </Typography>
                            </Stack>
                            <CircularProgressWithLabel value={stationData[0].currentFuelAmount / stationData[0].FuelCapacity * 100} />

                        </Stack>
                        {stationData && (
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                sx={{ mt: 2 }}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={0.5}
                                >
                                    {/* <SvgIcon
                                        color={positive ? 'success' : 'error'}
                                        fontSize="small"
                                    >
                                        {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                                    </SvgIcon> */}
                                    <Typography
                                        color={'#1976d2'}
                                        variant="body2"
                                    >
                                        {stationData[0].FuelCapacity}L
                                    </Typography>
                                </Stack>
                                <Typography
                                    color="text.secondary"
                                    variant="caption"
                                >
                                    Full Capacity
                                </Typography>
                            </Stack>
                        )}
                    </CardContent>
                </Card>

            }

        </>
    );
}

StationContent.propTypes = {
    sx: PropTypes.object,
    userCounts: PropTypes.array,
    stationData: PropTypes.array

};

