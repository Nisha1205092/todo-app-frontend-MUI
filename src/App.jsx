import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import AddTodoDialog from './components/add-todo-item/add-todo-item';
import CompletedList from './components/completed-list/completed-list';
import TodoList from './components/todo-list/todo-list';

const App = () => {
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
                My Todo List
              </Typography>

              <Switch
                onChange={changeTheme}
                checked={isDarkTheme}
                color="default"
              />
            </Stack>
          </Stack>
          <TodoList />
          <CompletedList />
          <AddTodoDialog />
          <Copyright />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;