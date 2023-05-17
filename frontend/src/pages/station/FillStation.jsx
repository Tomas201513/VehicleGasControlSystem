import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Container,
    Stack
} from '@mui/material';
import StationContext from 'src/context/StationContext';

function FillStation() {

    const { stationData, refetch: refetchStation } = React.useContext(StationContext);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={'10%'}>
                    <div>
                        <Typography variant="h4">
                            Stations
                        </Typography>
                    </div>
                    < Box>
                        {stationData?.map((station) => (
                            <Card key={station.id} sx={{ mb: 10 }}>
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
                                            {station?.currentFuelAmount}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            {/* {accountDetail?.email} */}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            {/* {accountDetail?.roles} */}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant="text"
                                    >
                                        Fill Station
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}

                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default FillStation











