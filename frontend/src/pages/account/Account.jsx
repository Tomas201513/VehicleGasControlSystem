import React from 'react'
import { Box, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import AccountProfile from './AccountProfile';
import AccountProfileDetail from './AccountProfileDetail';
function Account() {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    ml: '5%',
                    mr: '5%',
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
                                    <AccountProfile />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={8}
                                >
                                    <AccountProfileDetail />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default Account