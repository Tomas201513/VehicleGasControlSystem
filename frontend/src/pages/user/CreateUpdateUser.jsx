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
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import UserContext from "src/context/UserContext";
function CreateUpdateUser({ selectedData, editable, setEditable }) {

  const { createUser, updateUser } = React.useContext(UserContext);

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
            <CardHeader
              title={selectedData ? "Update Car" : "Create Car"}
            />

            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Stack spacing={2}>
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
                  />

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
                </Stack>
              </Box>
            </CardContent>
            {editable && (
              <Button color="primary" variant="contained" type="submit">
                {selectedData ? "Update" : "Create"}
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateUpdateUser;

CreateUpdateUser.propTypes = {
  selectedData: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,
  createOpen: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired,
};





