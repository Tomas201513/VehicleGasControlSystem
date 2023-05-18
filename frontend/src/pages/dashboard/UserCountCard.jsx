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
                                >
                                    {userCount.roleName}S
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <Typography variant="h5" >
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
                            <UsersIcon />
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
                            color="#2eb672"
                            variant="caption">
                            Users count
                        </Typography>
                    </Stack>
                )}
            </CardContent>
            {/* <Box sx={{}}>
                <LinearProgress
                    value={0}
                    variant="determinate"
                />
            </Box> */}

        </Card>
    );
};

UserCountCard.propTypes = {
    sx: PropTypes.object,
    userCounts: PropTypes.array,
    difference: PropTypes.number,
};
