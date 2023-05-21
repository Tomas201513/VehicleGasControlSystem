import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Stack,
    SvgIcon,
    Typography,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

export const UserCountCard = (props) => {
    const { difference, userCounts, sx } = props;

    return (
        <Card sx={sx}>
            <CardContent>

                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack spacing={1} direction="column" alignItems="left">
                        {userCounts.map((userCount) => (
                            <Stack spacing={2} direction="row" alignItems="left"
                                key={userCount.roleName} >
                                <Typography
                                    color="text.secondary"
                                    // gutterBottom
                                    variant="overline"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#9da4ae",
                                    }} 
                                >
                                    {userCount.roleName}S
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Typography sx={{
                                    fontWeight: "bold",
                                }} variant="h5"  >
                                    {userCount.count}
                                </Typography>

                            </Stack>
                        ))}
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: '#2eb672',
                            height: 56,
                            width: 56
                        }}
                    >
                        <SvgIcon>
                            <GroupIcon />
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
                            color="#2eb672"
                            variant="caption">
                            Users count
                        </Typography>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

UserCountCard.propTypes = {
    sx: PropTypes.object,
    userCounts: PropTypes.array,
    difference: PropTypes.number,
};
