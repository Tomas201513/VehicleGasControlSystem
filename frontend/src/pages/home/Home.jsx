import React from 'react'
import Pic from 'src/assets/Wavy.jpg'
import {
    Box,
    Typography,
    Container,
    Stack,
    Grid
} from '@mui/material'
function Home() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                ml: '5%',
                mr: '5%',
                mt: '10%'
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={'10%'}>
                    < Box>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <img src={Pic} alt="Wavy" style={{ width: '20rem', height: '20rem', objectFit: 'cover' }} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <Box sx={{ mt: '10%' }}>
                                    <Typography sx={{
                                        fontSize: '1rem',
                                        fontWeight: "bold",
                                        color: "#1c2536",
                                    }}
                                        variant="overline">
                                        {`Welcome to INSA Gas Station Management System!`}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '0.9rem',
                                        color: "#9da4ae",
                                    }}
                                        color="text.secondary"
                                    >
                                        {`This web application is designed to help streamline and simplify the gas filling process for service cars at INSA. With our user-friendly interface,
                                        you'll be able to easily manage and track all of your gas station needs.`}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '0.9rem',
                                        color: "#9da4ae",
                                    }}
                                        color="text.secondary"
                                    >
                                        {`The app provides real-time updates on gas levels, making it easy to stay on top of inventory and prevent running out of fuel. 
                                        You can also assign specific fueling stations to inBoxidual service cars, 
ensuring that each vehicle is getting the attention it needs.`}                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </Container>
        </Box>


    )
}

export default Home