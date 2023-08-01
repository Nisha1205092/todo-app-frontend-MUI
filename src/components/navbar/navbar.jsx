import * as React from 'react';
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
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [theme, setTheme] = useRecoilState(themeState)
    const isDarkTheme = theme === 'dark';

    const changeTheme = () => {
        const updatedTheme = isDarkTheme ? 'light' : 'dark';
        setTheme(updatedTheme);
        localStorage.setItem('theme', updatedTheme)
        console.log({ updatedTheme })
    }

    return (
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
                        sx={
                            {
                                color: "white",
                            }
                        }
                    >
                        <Link to="/auth">
                            <Typography
                                sx={{
                                    color: 'white'
                                }}
                            >Login
                            </Typography>
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
