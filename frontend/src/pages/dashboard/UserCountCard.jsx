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
    Typography
} from '@mui/material';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';


export const UserCountCard = (props) => {
    const { userCounts, sx } = props;

    return (
        <Card sx={sx}>
            <CardContent>

                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack spacing={1} direction="column" alignItems="left">
                        {userCounts.map((userCount) => (
                            <Stack spacing={3} direction="row" alignItems="left"
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

            </CardContent>
        </Card>
    );
};

UserCountCard.propTypes = {
    sx: PropTypes.object,
    userCounts: PropTypes.array
};

{/* <Box sx={{ mt: 3 }}>
    <LinearProgress
        value={54}
        variant="determinate"
    />
</Box> */}