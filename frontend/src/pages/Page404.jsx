import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
// import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import fof from 'src/assets/fof.gif';

const Page404 = () => {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
  <>
    {/* <Helmet title="404: Not found" /> */}
   
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
              <img
              alt="Under development"
                src={fof}
              />
          </Box>

          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Button
              onClick={goBack}     
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back 
          </Button>
        </Box>
      </Container>
    </Box>
  </>
  )
}

export default Page404;