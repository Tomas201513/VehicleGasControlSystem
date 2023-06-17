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
    Unstable_Grid2 as Grid
} from '@mui/material';
import { Formik, Form } from "formik";
import * as yup from "yup";
import AuthContext from 'src/context/AuthContext';
import UserContext from "src/context/UserContext";

function AccountProfileDetail() {
    const { accountDetail, updateUser, refetchAccount } = useContext(UserContext);
    const { userDetail } = useContext(AuthContext);


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

    const handleSubmit = async (values, { resetForm }) => {
        try {
            // console.log('sssssssssssssssssssssssssss', JSON.stringify(userDetail._id, values));
            await updateUser({ selectedData: userDetail._id, values });
            resetForm();
        } catch (error) {
            // console.log(error);
        }
        refetchAccount();
    };
    return (
        <>
            <Formik
                initialValues={{
                    userName: accountDetail?.userName || "",
                    email: accountDetail?.email || "",
                    password: accountDetail?.password || "",
                    roles: accountDetail?.roles[0] || "",
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
                        <Card sx={{
                            border: "none",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            '&:hover': {
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }
                        }}>
                            <CardHeader
                                subheader="The information can be edited"
                                title="Profile"
                            />
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
                                                fullWidth
                                                label="User Name"
                                                name="userName"
                                                onChange={handleChange}
                                                required
                                                value={values.userName}
                                                error={Boolean(touched.userName && errors.userName)}
                                                helperText={touched.userName && errors.userName}
                                            />
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                required
                                                value={values?.email}
                                                onChange={handleChange}
                                                error={Boolean(touched.email && errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <TextField
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
                                            <TextField
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                                label="Role"
                                                name="roles"
                                                onChange={handleChange}
                                                type="string"
                                                value={values.roles}
                                            />
                                        </Grid>

                                    </Grid>
                                </Box>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button variant="contained" type="submit">
                                    Save details
                                </Button>
                            </CardActions>
                        </Card>
                    </Form>)}
            </Formik >
        </>
    )
}

export default AccountProfileDetail