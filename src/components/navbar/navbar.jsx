import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SimpleThemeToggler from '../theme-toggler/simple-theme-toggler';
import { themeState } from '../../state/theme.recoil';
import { useRecoilState } from 'recoil';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOutUser } from '../../utils/firebase';
import { userState } from '../../state/authState.recoil';

const NavBar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useRecoilState(themeState)
    const isDarkTheme = theme === 'dark';
    const navigate = useNavigate();
    // Use useState to manage the user state
    const userString = localStorage.getItem('user');
    const parsedUser = JSON.parse(userString);
    const [user, setUser] = useState(parsedUser);
    const [authUser, setAuthUser] = useRecoilState(userState)

    useEffect(() => {
        setUser(parsedUser); // Update the user state
        console.log({ user })
        setIsLoading(false);
        if (user === null) {
            setAuthUser(null)
            navigate('/signin')
        }
    }, [authUser])

    const changeTheme = () => {
        const updatedTheme = isDarkTheme ? 'light' : 'dark';
        setTheme(updatedTheme);
        localStorage.setItem('theme', updatedTheme)
        console.log({ updatedTheme })
    }

    return (
        <div
            style={{ width: "100vw", height: "100vh" }}
        >


            {
                isLoading ?
                    <div
                        style={{
                            color: 'white',
                            textAlign: 'center'
                        }
                        } >
                        <CircularProgress color="secondary" />
                    </div >
                    :
                    <>
                        <Box
                            sx={{
                                flexGrow: 1,
                                "& .MuiPaper-root": {
                                    backgroundColor: 'primary.main'
                                }
                            }}
                        >
                            <AppBar position="static">
                                <Toolbar>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        News
                                    </Typography>
                                    <SimpleThemeToggler
                                        themeToggler={changeTheme}
                                        isDarkTheme={isDarkTheme}
                                    />
                                    <Button
                                        onClick={() => {
                                            signOutUser()
                                            navigate('/signin')
                                            localStorage.setItem('user', null)
                                        }}
                                        sx={
                                            {
                                                color: "white",
                                            }
                                        }
                                    >
                                        <Link>
                                            <Typography
                                                sx={{
                                                    color: 'white'
                                                }}
                                            >LogOut
                                            </Typography>
                                        </Link>
                                    </Button>
                                </Toolbar>
                            </AppBar>
                        </Box>
                        <Outlet />
                    </>
            }
        </div>
    );
}

export default NavBar;
