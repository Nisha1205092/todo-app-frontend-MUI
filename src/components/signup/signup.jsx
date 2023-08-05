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

const defaultFormFields = {
    email: '',
    password: '',
    confirmPassword: ''
}

const Signup = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, confirmPassword } = formFields;
    const [authUser, setAuthUser] = useRecoilState(userState);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(authUser);
        if (authUser) {
            const authString = JSON.stringify(authUser)
            localStorage.setItem('user', authString)
            navigate('/')
        }
    }, [authUser]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }, [formFields])

    const resetFormFields = useCallback(() => {
        setFormFields(defaultFormFields)
    }, [])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // console.log({
        //     email: data.get("email"),
        //     password: data.get("password"),
        //     confirmPassword: data.get("confirmPassword")
        // });
        if (password !== confirmPassword) {
            alert('passwords do not match')
            return;
        }
        const user = await firebaseSignUpWithEmailAndPassword({ email, password })
        console.log(`after firebase returns: ${user.email}, ${user.uid}`)

        // send data to backend
        axios.post(`${import.meta.env.VITE_SERVER_URL}${USER_SIGNUP}`,
            {
                email: user.email,
                uid: user.uid
            })
            .then(res => {
                const auth = {
                    email: user.email,
                    uid: user.uid
                }
                navigate('/')
                // save state locally as a recoil state
                setAuthUser(auth)
                console.log(res.data)
            })
            .catch((err) => {
                // console.log({ err })
                // alert('Something went wrong!')
                if (err.response) {
                    // Request made and server responded
                    const { status, config } = err.response;

                    if (status === 404) {
                        alert(`${config.url} not found`);
                    }
                    if (status === 500) {
                        alert("Server error");
                    }
                } else if (err.request) {
                    // Request made but no response from server
                    alert("Error", err.message);
                } else {
                    // some other errors
                    alert("Error", err.message);
                }
            })
        // console.log({ email: user.email, uid: user.uid })
        // saveUser(user, setAuthUser);
        // if (user) {
        // }
        // console.log(authUser)
        resetFormFields()
    }, [formFields]);

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