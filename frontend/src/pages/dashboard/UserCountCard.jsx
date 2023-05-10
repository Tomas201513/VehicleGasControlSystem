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
    const { value, sx, title } = props;

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
                            color="text.secondary"
                            gutterBottom
                            variant="overline"
                        >
                            {title}S
                        </Typography>
                        <Typography variant="h4">
                            {value}
                        </Typography>
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
                <Box sx={{ mt: 3 }}>
                    <LinearProgress
                        value={value}
                        variant="determinate"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

UserCountCard.propTypes = {
    value: PropTypes.number.isRequired,
    sx: PropTypes.object,
    title: PropTypes.string
};