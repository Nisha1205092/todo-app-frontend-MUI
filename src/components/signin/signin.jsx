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
import { SignInWithEmailAndPassword } from "../../utils/firebase";
import { useRecoilState } from "recoil";
import { userState } from "../../state/authState.recoil";
import { saveUser } from "../../utils/utils";

const defaultFormFields = {
    email: '',
    password: ''
}

const Signin = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    // console.log({ email, password })
    const [authUser, setAuthUser] = useRecoilState(userState);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(authUser);
        if (authUser) {
            navigate('/') //if user is already signed in, then it automatically takes to the home page
        }
    }, [authUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // console.log({
        //     email: data.get("email"),
        //     password: data.get("password")
        // });
        const user = await SignInWithEmailAndPassword({ email, password })
        // console.log({ email: user.email, uid: user.uid })
        saveUser(user, setAuthUser);
        // console.log(authUser)
        resetFormFields()
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