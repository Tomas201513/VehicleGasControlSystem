import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';


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

                            {stationData.slice(0, 2).map((userCount, index) => (
                                <ListItem
                                    divider
                                    key={userCount._id}>
                                    <ListItemAvatar>
                                        <Box
                                            sx={{
                                                borderRadius: 1,
                                                backgroundColor: 'neutral.200',
                                                height: '100%',
                                                width: 60,
                                                pr: 1,
                                            }}
                                        >
                                            {/* {userCount?.stationName} */}
                                            <CircularProgressWithLabel value={stationData[index]?.currentFuelAmount / stationData[index]?.FuelCapacity * 100} />
                                        </Box    >

                                    </ListItemAvatar>
                                    <ListItemText

                                        primary={`${userCount.currentFuelAmount} L`}
                                        primaryTypographyProps={{
                                            fontWeight: "bold",
                                            fontSize: '0.9rem',

                                            variant: 'subtitle1'
                                        }}
                                        secondary={`${(userCount.FuelCapacity).toFixed(2)} L Total Capacity`}
                                        secondaryTypographyProps={{
                                            fontSize: '0.9rem',
                                            fontWeight: "bold",
                                            color: "#9da4ae", variant: 'body2'
                                        }}

                                        sx={{

                                            // borderRadius: 1,
                                            backgroundColor: 'neutral.200',
                                            // height: '100%',
                                            width: 70,
                                        }}
                                    />
                                    <br />
                                    <Typography sx={{
                                        fontSize: '0.9rem',
                                        fontWeight: "bold",
                                        color: "#9da4ae",
                                    }} whitespace="nowrap">
                                    {userCount?.stationName}
                                    </Typography>

                                </ListItem>
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
                                    sx={{
                                        fontSize: '0.9rem',
                                        fontWeight: "bold",
                                        color: "#9da4ae",
                                    }}
                                >
                                    {stationData[0]?.stationName}

                                </Typography>
                                <Typography
                                    fontWeight="bold"
                                    variant="h4" whitespace="nowrap">
                                    {(stationData[0]?.currentFuelAmount)} L
                                </Typography>
                            </Stack>
                            <CircularProgressWithLabel value={stationData[0]?.currentFuelAmount / stationData[0]?.FuelCapacity * 100} />

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
                                        whitespace="nowrap"
                                        fontSize='0.9rem'


                                    >
                                        {stationData[0]?.FuelCapacity} L
                                    </Typography>
                                </Stack>
                                <Typography
                                    fontSize='0.9rem'

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

