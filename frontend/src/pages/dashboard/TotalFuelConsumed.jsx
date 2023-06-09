import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import PropaneIcon from '@mui/icons-material/Propane';
function TotalFuelConsumed(props) {
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
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                fontWeight: "bold",
                                color: "#9da4ae",
                            }}
                            color="text.secondary"
                            variant="overline"
                        >
                            {'TOTAL GAS CONCEPTION'}
                        </Typography>
                        <Typography sx={{
                            fontWeight: "bold",
                        }} variant="h4" whitespace="nowrap">
                            {JSON.stringify(value)} L
                        </Typography>
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: '#f04438',
                            height: 56,
                            width: 56
                        }}
                    >
                        <SvgIcon>
                            <PropaneIcon />
                        </SvgIcon>
                    </Avatar>
                </Stack>
                {difference && (
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2 }}
                    >
                        {/* <Stack
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
                                {JSON.stringify(difference)}%
                            </Typography>
                        </Stack> */}
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                            }}
                            color="#f04438"
                            variant="caption">
                            Since start recording data
                        </Typography>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}

export default TotalFuelConsumed

TotalFuelConsumed.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    sx: PropTypes.object,
    value: PropTypes.number.isRequired
};