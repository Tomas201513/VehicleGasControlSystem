import { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Container,
  Tooltip,
  IconButton,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Formik, Form } from "formik";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import Warndialogue from "src/components/Warndialogue";

import UserContext from "src/context/UserContext";
function CreateUpdateUser({ selectedData, editable, setEditable, name }) {

  const { createUser, updateUser, setSelectedData, setCreateOpen, deleteUser, warn, SetWarn } = useContext(UserContext);

  const FormSchema = yup.object().shape({
    userName: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    roles: yup.string().required("Role is required"),
  });

  const handleSubmit = async (values) => {
    try {
      if (selectedData) {
        // console.log(selectedData._id);
        await updateUser({ selectedData: selectedData?._id, values });
      } else {
        console.log(values);
        await createUser(values);
      }
      setEditable(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: '10%',
          ml: '5%',
          mr: '5%',
        }}
      >
        <Container maxWidth="lg">

          < Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
                lg={4}
              >
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={'5%'} >

                  <Tooltip title="Back">
                    <IconButton
                      onClick={() => {
                        setSelectedData(null), setEditable(false), setCreateOpen(false);
                      }}
                      size="small"
                    >
                      <ArrowBackIcon size="small" />
                    </IconButton>
                  </Tooltip>
                  {/* <Box sx={{ flexGrow: 1 }} /> */}

                </Box>
              </Grid>
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                <Formik
                  initialValues={{
                    userName: selectedData?.userName || "",
                    email: selectedData?.email || "",
                    password: selectedData?.password || "",
                    roles: selectedData?.roles[0] || "",
                  }}
                  validationSchema={FormSchema}
                  onSubmit={handleSubmit}


                >
                  {({ errors, touched, values, handleChange, resetForm }) => (
                    <Form
                    // autoComplete="off"
                    // noValidate
                    // onSubmit={handleSubmit}
                    >
                      <Card const sx={{
                        flexGrow: 1,
                        border: "none",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.06)",
                        borderRadius: "10px",
                      }}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={'2%'}>

                          <CardHeader
                            title={selectedData ? "Update User" : "Create User"}
                            subheader={selectedData ? "The information can be edited" : "Fill in the required information"}
                          />
                          {selectedData ? (

                            <>
                              <Tooltip title="Editable">
                                <FormControlLabel
                                  control={<Switch />}
                                  // label="edit"
                                  onChange={() => setEditable(!editable)}
                                />
                              </Tooltip>
                            </>) : (
                            <></>
                          )}

                        </Box>
                        <CardContent sx={{ p: '5%' }}>
                          <Box sx={{ m: -1.5 }}>
                            <Grid
                              container
                              spacing={3}
                            >

                              <Grid
                                xs={12}
                                md={6}
                              >
                                <TextField
                    InputProps={{
                      readOnly: !editable,
                    }}

                    autoFocus={editable}
                    fullWidth
                    label="Username"
                    name="userName"
                    value={values?.userName}
                    onChange={handleChange}
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                              </Grid>
                              <Grid
                                xs={12}
                                md={6}
                              >
                  <TextField
                    InputProps={{
                      readOnly: !editable,
                    }}

                    fullWidth
                    label="Email"
                    name="email"
                    value={values?.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                                /> </Grid>
                              <Grid
                                xs={12}
                                md={6}
                              >

                  <TextField
                    InputProps={{
                      readOnly: !editable,
                    }}

                    fullWidth
                    label="Password"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                              </Grid>
                              <Grid

                                xs={12}
                                md={6}
                              >

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      inputProps={{
                        readOnly: !editable,
                      }}

                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="roles"
                      value={values?.roles}
                      onChange={handleChange}
                      error={Boolean(touched.roles && errors.roles)}
                      helperText={touched.roles && errors.roles}
                    >
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"attendant"}>attendant</MenuItem>
                      <MenuItem value={"driver"}>driver</MenuItem>
                      <MenuItem value={"super_admin"}>super_admin</MenuItem>
                    </Select>
                  </FormControl>

                              </Grid>
                            </Grid>
                          </Box>
                        </CardContent >
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
                          {selectedData ? (

                            <>
                              <Button variant="contained" type="submit">
                                {"Update"}
                              </Button>
                              <Tooltip title="Delete">
                                <Button variant="contained" color="error" onClick={() => SetWarn(true)}>
                                  {"Delete"}
                                </Button>
                              </Tooltip>

                            </>) : (
                            <> <Button variant="contained" type="submit">
                              {"Create"}
                            </Button></>
                          )}

                        </CardActions>
                      </Card>
                    </Form>)}
                </Formik >
              </Grid>

            </Grid>
          </Box>
        </Container>
      </Box>
      <Warndialogue
        open={warn}
        setOpen={SetWarn}
        name={name}
        action={deleteUser}
        selectedData={selectedData}
      />
    </>
  )
}

export default CreateUpdateUser;

CreateUpdateUser.propTypes = {
  selectedData: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  createOpen: PropTypes.bool.isRequired,
  createUser: PropTypes.func,
  updateUser: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

