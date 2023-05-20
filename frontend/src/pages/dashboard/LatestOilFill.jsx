import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
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
// import { Scrollbar } from 'src/components/scrollbar';
// import { SeverityPill } from 'src/components/severity-pill';
import React from 'react';
import TimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

// Initialize the library
JavascriptTimeAgo.addLocale(en);

const statusMap = {
    pending: 'warning',
    delivered: 'success',
    refunded: 'error'
};

export const LatestOilFill = (props) => {
    const { fuelIntakes = [], sx, } = props;
    const firstTenFuelIntakes = fuelIntakes.slice(0, 6);

    const navigate = useNavigate();

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
                                        <TimeAgo date={fill?.fuelDate} />
                                        {/* <SeverityPill color={statusMap[fill.status]}>
                                                {fill.status}
                                            </SeverityPill> */}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            {/* </Scrollbar> */}
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    onClick={() => navigate('/app/fuel')}
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowRightIcon />
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
