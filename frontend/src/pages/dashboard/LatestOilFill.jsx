import React from 'react';
import PropTypes from 'prop-types';
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography

} from '@mui/material';

export const LatestOilFill = (props) => {
    const { fuelIntakes = [], sx, } = props;
    const firstTenFuelIntakes = fuelIntakes.slice(0, 6);

    const navigate = useNavigate();
    function pluralize(number, singular, plural) {
        return number === 1 ? singular : plural;
    }
    function timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return years + pluralize(years, " year ago", " years ago");
        if (months > 0) return months + pluralize(months, " month ago", " months ago");
        if (weeks > 0) return weeks + pluralize(weeks, " week ago", " weeks ago");
        if (days > 0) return days + pluralize(days, " day ago", " days ago");
        if (hours > 0) return hours + pluralize(hours, " hour ago", " hours ago");
        if (minutes > 0) return minutes + pluralize(minutes, " minute ago", " minutes ago");
        return seconds + pluralize(seconds, " second ago", " seconds ago");
    }

    return (
        <Card sx={sx}>
            <Typography sx={{
                fontWeight: "bold",
                color: "#000",
                padding: "10px",
            }} variant="h6" >
                Latest Oil Fill
            </Typography>

            <Box sx={{ overflowX: 'auto', }}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                fontSize: '0.97rem',
                                fontWeight: "bold",
                            }}>
                                Driver
                            </TableCell>
                            <TableCell sx={{
                                fontSize: '0.97rem',
                                fontWeight: "bold",
                            }}>
                                Car Plate Number
                            </TableCell>
                            <TableCell sortDirection="desc" sx={{
                                fontSize: '0.97rem',
                                fontWeight: "bold",
                            }}>
                                Fill Amount
                            </TableCell>
                            <TableCell sx={{
                                fontSize: '0.97rem',
                                fontWeight: "bold",
                            }}>
                                Station Name
                            </TableCell>
                            <TableCell sx={{
                                fontSize: '0.97rem',
                                fontWeight: "bold",
                            }}>
                                Time
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.06)",
                        borderRadius: "10px",

                    }}>
                        {firstTenFuelIntakes.map((fill) => {
                            // const createdAt = format(fill?.fuelDate, 'dd/MM/yyyy');

                            return (
                                <TableRow
                                    hover
                                    key={fill._id}
                                >
                                    <TableCell sx={{
                                        fontSize: '0.97rem',
                                        fontWeight: "normal"
                                    }}>
                                        {fill?.car_id?.driver?.userName}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontSize: '0.97rem',
                                        fontWeight: "normal"
                                    }}>
                                        {fill?.car_id?.plateNumber}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontSize: '0.97rem',
                                        fontWeight: "normal"
                                    }}>
                                        {fill?.fuelAmount}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontSize: '0.97rem',
                                        fontWeight: "normal"
                                    }}>
                                        {fill?.station?.stationName}
                                    </TableCell>

                                    <TableCell sx={{
                                        fontSize: '0.97rem',
                                        fontWeight: "normal"
                                    }}>
                                        {timeAgo(fill?.fuelDate)} 
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    onClick={() => navigate('/app/fuel')}
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <EastIcon />
                        </SvgIcon>
                    )}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </CardActions>
        </Card >
    );
};

LatestOilFill.propTypes = {
    sx: PropTypes.object,
    fuelIntakes: PropTypes.array


};
