import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SimpleThemeToggler from '../theme-toggler/simple-theme-toggler';
import { themeState } from '../../state/theme.recoil';
import { useRecoilState } from 'recoil';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOutUser } from '../../utils/firebase';
import { userState } from '../../state/authState.recoil';
import LogoutIcon from '@mui/icons-material/Logout';
import LeftDrawer from '../left-drawer/left-drawer';
import { useCallback } from 'react';
import useAuth from '../../customHooks/useAuth';

const NavBar = () => {
    const [user, logout] = useAuth()

    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useRecoilState(themeState)
    const isDarkTheme = theme === 'dark';
    const navigate = useNavigate();
    // initially get the login status from browser's local storage
    // const userString = localStorage.getItem('user');
    // const parsedUser = JSON.parse(userString);
    // // const [user, setUser] = useState(parsedUser);
    // const [authUser, setAuthUser] = useRecoilState(userState)

    // for the first time navbar mounts, 
    // set the user status according to the status
    // saved in the local storage 
    // useEffect(() => {
    //     setAuthUser(parsedUser)
    // }, [])

    useEffect(() => {
        // setAuthUser(parsedUser); // Update the user state
        console.log({ user })
        setIsLoading(false);
        if (user?.email?.length) {
            // setAuthUser(null)
            navigate('/')
        } else {
            // setAuthUser(user)
            navigate('/signin')
        }
    }, [user])

    const changeTheme = useCallback(() => {
        const updatedTheme = isDarkTheme ? 'light' : 'dark';
        setTheme(updatedTheme);
        localStorage.setItem('theme', updatedTheme)
        console.log({ updatedTheme })
    }, [isDarkTheme])

    const logOutHandler = useCallback(() => {
        logout();
    }, [])

    return (
        <>
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
                                    {
                                        user?.email?.length
                                        &&
                                        <LeftDrawer userEmail={user.email} />
                                    }
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Welcome!
                                    </Typography>
                                    <SimpleThemeToggler
                                        themeToggler={changeTheme}
                                        isDarkTheme={isDarkTheme}
                                    />

                                    {
                                        user?.email?.length ?
                                            (
                                                <Link to='/signin'>
                                                    <IconButton
                                                        onClick={logOutHandler}
                                                    >
                                                        <LogoutIcon />
                                                    </IconButton>
                                                </Link>
                                            )
                                            : <span></span>
                                    }
                                </Toolbar>
                            </AppBar>
                        </Box>
                        <Outlet />
                    </>
            }
        </>
    );
}

export default NavBar;
