import React from "react";
import {
  Button,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardContent,
  CardHeader,
  Box,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Container,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import UserContext from "src/context/UserContext";
import Warndialogue from "src/components/Warndialogue";
function CreateUpdateUser({ selectedData, editable, setEditable }) {

  const { createUser, updateUser, setSelectedData, setCreateOpen, deleteUser, warn, SetWarn } = React.useContext(UserContext);

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
        await updateUser({ selectedData: selectedData._id, values });
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
        {({ errors, touched, values, handleChange }) => (
          <Form>
            {/* <CardHeader
              title={selectedData ? "Update Car" : "Create Car"}
            /> */}
            <Container maxWidth="md" sx={{ marginTop: "13vh", maxWidth: 600 }}>

              <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={'5%'}>

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
                <Box sx={{ flexGrow: 1 }} />
                {selectedData ? (

                  <>
                    <Tooltip title="Editable">
                      <FormControlLabel
                        control={<Switch />}
                        // label="edit"
                        onChange={() => setEditable(!editable)}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => SetWarn(true)}>
                        <DeleteIcon size="small" color="error" />
                      </IconButton>

                    </Tooltip>
                    {/* <Typography>{'Delete'}</Typography> */}

                  </>) : (
                  <></>
                )}
              </Box>
              <CardContent sx={{ pt: 0, mb: '5%' }}>
                {/* <Box sx={{ m: -1.5 }}> */}
                <Stack spacing={2}>
                  <TextField
                    InputProps={{
                      readOnly: !editable,
                    }}
                    variant="standard"
                    autoFocus={editable}
                    fullWidth
                    label="Username"
                    name="userName"
                    value={values?.userName}
                    onChange={handleChange}
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />

                  <TextField
                    InputProps={{
                      readOnly: !editable,
                    }}
                    variant="standard"
                    fullWidth
                    label="Email"
                    name="email"
                    value={values?.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    InputProps={{
                      readOnly: !editable,
                    }}
                    variant="standard"
                    fullWidth
                    label="Password"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      inputProps={{
                        readOnly: !editable,
                      }}
                      variant="standard"
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
                </Stack>
                {/* </Box> */}
              </CardContent>
              {editable && (
                <Button b style={{ backgroundColor: '#4276a8' }}
                  variant="contained" type="submit" fullWidth>
                  {selectedData ? "Update" : "Create"}
                </Button>
              )}
            </Container>

          </Form>
        )}
      </Formik >
      <Warndialogue
        open={warn}
        setOpen={SetWarn}
        title={"Delete User"}
        content={"Are you sure you want to delete this user?"}
        action={deleteUser}
        selectedData={selectedData}
      />
    </>

  );
}

export default CreateUpdateUser;

CreateUpdateUser.propTypes = {
  selectedData: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  createOpen: PropTypes.bool.isRequired,
  createUser: PropTypes.func,
  updateUser: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired,
};




