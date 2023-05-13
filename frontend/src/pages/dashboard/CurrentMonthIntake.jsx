import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
export const CurrentMonthIntake = (props) => {
    const { difference, positive = false, sx, value } = props;

    return (
        <Card sx={sx}>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack spacing={1}>
                        <>
                            <Typography
                                color="text.secondary"
                                variant="overline"
                                sx={{ mb: 0 }}
                            >
                                {'CURRENT MONTH '}
                                <br style={{ margin: 0 }} />
                                {'GAS CONCEPTION'}

                            </Typography>
                        </>
                        <Typography variant="h4">
                            {value}L
                        </Typography>
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: '#d59b08',
                            height: 56,
                            width: 56
                        }}
                    >
                        {/* <SvgIcon> */}
                        <WaterDropIcon />
                        {/* </SvgIcon> */}
                    </Avatar>
                </Stack>
                {/* {difference && (
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
                            <SvgIcon
                                color={positive ? 'success' : 'error'}
                                fontSize="small"
                            >
                                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                            </SvgIcon>
                            <Typography
                                color={positive ? 'success.main' : 'error.main'}
                                variant="body2"
                            >
                                {difference}%
                            </Typography>
                        </Stack>
                        <Typography
                            color="text.secondary"
                            variant="caption"
                        >
                            Since last month
                        </Typography>
                    </Stack>
                )} */}
            </CardContent>
        </Card>
    );
};

CurrentMonthIntake.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    value: PropTypes.string.isRequired,
    sx: PropTypes.object,
    title: PropTypes.string.isRequired
};
