import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import TodoItem from './components/todo-item/todo-item';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormDialog from './components/todo-form-dialog/todo-form-dialog';
import CompletedList from './components/completed-list/completed-list';

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
      <Container
        sx={{
          maxWidth: 'md',
          p: 0,
        }}
      >
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
          <div>
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
          </div>
          <CompletedList />
          <FormDialog />
          <Copyright />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
