import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { firebaseSignUpWithEmailAndPassword } from "../../utils/firebase";
import { useRecoilState } from "recoil";
import { userState } from "../../state/authState.recoil";
import { saveUser } from "../../utils/utils";
import { USER_SIGNUP } from "../../routes/routes";
import { useCallback } from "react";
import axios from "axios";
import useAuth from "../../customHooks/useAuth";
import { useUserSignUp } from "../../utils/tanstack-query";

const defaultFormFields = {
    email: '',
    password: '',
    confirmPassword: ''
}

const Signup = () => {
    // using custom hook
    const [user, login] = useAuth();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, confirmPassword } = formFields;
    const { isError, isSuccess, mutate } = useUserSignUp(user)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (user?.email?.length) {
            navigate('/')
        }
    }, [user]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }, [formFields])

    const resetFormFields = useCallback(() => {
        setFormFields(defaultFormFields)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords do not match')
            return;
        }

        try {
            const userFirebase = await firebaseSignUpWithEmailAndPassword({ email, password })
            console.log(`after firebase returns: ${userFirebase.email}, ${userFirebase.uid}`)

            if (userFirebase) {
                const auth = {
                    email: userFirebase.email,
                    uid: userFirebase.uid
                }
                console.log(auth)
                mutate(auth);
                if (isError) {
                    console.log('sigup faced some error')
                }
                if (isSuccess) {
                    console.log('signup successful')
                    login(auth)
                }
                // send data to backend
                // axios.post(`${import.meta.env.VITE_SERVER_URL}${USER_SIGNUP}`,
                //     {
                //         email: userFirebase.email,
                //         uid: userFirebase.uid
                //     })
                //     .then(res => {
                //         const auth = {
                //             email: userFirebase.email,
                //             uid: userFirebase.uid
                //         }
                //         navigate('/')
                //         // save state locally as a recoil state
                //         // use custom hook to update the state and local storage
                //         login(auth)
                //         console.log(res.data)
                //     })
                //     .catch((err) => {
                //         // console.log({ err })
                //         // alert('Something went wrong!')
                //         if (err.response) {
                //             // Request made and server responded
                //             const { status, config } = err.response;

                //             if (status === 404) {
                //                 alert(`${config.url} not found`);
                //             }
                //             if (status === 500) {
                //                 alert("Server error");
                //             }
                //         } else if (err.request) {
                //             // Request made but no response from server
                //             alert("Error", err.message);
                //         } else {
                //             // some other errors
                //             alert("Error", err.message);
                //         }
                //     })
                resetFormFields()
            }
        } catch (error) {
            alert(`code: ${error.code} message: ${error.message}`)
            navigate('/signup')
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: 'secondary.light'
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: 'secondary.dark'
                        }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to="/signin">
                                <Typography component={'span'} variant="body2">
                                    {"Already have an account? Sign In"}
                                </Typography>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;