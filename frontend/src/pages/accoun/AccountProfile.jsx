import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import UserContext from "src/context/UserContext";

function AccountProfile() {
    const { accountDetail } = React.useContext(UserContext);
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        // src={user.avatar}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                        }}
                    />
                    <Typography
                        gutterBottom
                        variant="h5"
                    >
                        {accountDetail?.userName}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {accountDetail?.email}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        {accountDetail?.roles}
                    </Typography>
                </Box>
            </CardContent>
            {/* <Divider />
            <CardActions>
                <Button
                    fullWidth
                    variant="text"
                >

                </Button>
            </CardActions> */}
        </Card>
    )
}

export default AccountProfile