import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { Helmet } from "react-helmet-async";

const  Page404= () => (
  <>
    <Helmet title="404: Not found" />
   
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
        mt: '20%',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            {/* <img
              alt="Under development"
              src="src/assets/errors/error-404.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400
              }}
            /> */}
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            404          </Typography>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h5"
          >
            you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Button
            href="/app"           
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back 
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page404;