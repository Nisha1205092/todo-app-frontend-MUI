import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import TodoItem from './components/todo-item/todo-item';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import Switch from '@mui/material/Switch';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    console.log({ isDarkTheme })
  }
  return (
    <ThemeProvider
      theme={isDarkTheme ?
        createTheme(darkTheme)
        : createTheme(lightTheme)}
    >
      <Container sx={{ maxWidth: 'lg', p: 0 }}>
        <Stack
          bgcolor="primary.dark"
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingTop={5}
          borderRadius={3}
        >
          <Stack
            padding={2}
            width='100%'
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              borderBottom="3px solid white"
            >
              <Typography sx={{ color: 'primary.contrastText' }} variant="h4" component="h1" gutterBottom>
                My Todo App
              </Typography>

              <Switch
                onChange={changeTheme}
                checked={isDarkTheme}
                color="default"
              />
            </Stack>
          </Stack>
          <TodoItem />
          <TodoItem />
          <IconButton
            sx={
              {
                color: "#B66FFD",

              }
            }
            aria-label='add'
          >
            <AddCircleIcon sx={{ fontSize: 60 }} />
          </IconButton>
          <Copyright />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
