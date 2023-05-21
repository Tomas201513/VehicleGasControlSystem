import React from 'react'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import UserContext from "src/context/UserContext";

function AccountProfile() {
    const { accountDetail } = React.useContext(UserContext);
    return (
        <Card sx={{
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            '&:hover': {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }
        }}>
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