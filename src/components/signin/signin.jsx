import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { firebaseSignInWithEmailAndPassword } from "../../utils/firebase";
import { useRecoilState } from "recoil";
import { userState } from "../../state/authState.recoil";
import { USER_SIGNIN } from "../../routes/routes";
import { useCallback } from "react";
import axios from "axios";
import useAuth from "../../customHooks/useAuth";
import { useUserSignIn } from "../../utils/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../../utils/utils";

const defaultFormFields = {
    email: '',
    password: ''
}

const Signin = () => {
    // using custom hook
    const [user, login] = useAuth();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    // console.log({ email, password })
    // const [authUser, setAuthUser] = useRecoilState(userState);
    const { isError, isSuccess, mutate } = useMutation({
        mutationFn: (email) => signInUser(email)
    })
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (isSuccess) {
            navigate('/') //if user is already signed in, then it automatically takes to the home page
        }
    }, [user]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }, [formFields])

    const resetFormFields = useCallback(() => {
        setFormFields(defaultFormFields)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userFirebase = await firebaseSignInWithEmailAndPassword({ email, password })

            if (userFirebase) {
                const auth = {
                    email: userFirebase.email,
                    uid: userFirebase.uid
                }

                console.log(auth);
                mutate(auth.email)
                if (isError) {
                    console.log('sigin faced some error')
                }
                if (isSuccess) {
                    // save {email, uid} in localStorage and custom hook
                    login(auth)
                    console.log('signin successful')
                }
                // send data to backend
                // axios.post(`${import.meta.env.VITE_SERVER_URL}${USER_SIGNIN}`, {
                //     headers: {
                //         'email': userFirebase.email
                //     }
                // })
                //     .then(() => navigate('/'))
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
                // console.log(authUser)
                resetFormFields()
            }
        } catch (error) {
            alert(`code: ${error.code} message: ${error.message}`)
            navigate('/signin')
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
                    Sign in
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
                        label="Password"
                        value={password}
                        onChange={handleChange}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: "secondary.dark"
                        }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <NavLink to="/signup">
                                <Typography component={'span'} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Typography>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Signin;