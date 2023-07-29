import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import AddTodoDialog from './components/add-todo-item/add-todo-item';
import CompletedList from './components/completed-list/completed-list';
import TodoList from './components/todo-list/todo-list';
import { ConfirmProvider } from 'material-ui-confirm';
import SimpleThemeToggler from './components/theme-toggler/simple-theme-toggler';

const App = () => {
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';

  const changeTheme = () => {
    const updatedTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme)
    console.log({ updatedTheme })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('prefers-color-scheme: dark').matches;
    console.log('prefers dark: ', prefersDark)
    if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    }
  }, [])

  return (
    <ThemeProvider
      theme={isDarkTheme ?
        createTheme(darkTheme)
        : createTheme(lightTheme)}
    >
      <ConfirmProvider>
        <Container
          sx={{
            display: 'grid',
            flexDirection: 'column',
            minHeight: '100vh',
            maxWidth: 'md',
            p: 0,
          }}
        >
          <Stack
            bgcolor="primary.dark"
            display="grid"
            gridTemplateColumns="1fr"
            gridTemplateRows="min-content auto 1fr min-content min-content 10px"
            justifyItems="center"
            justifyContent="flex-start"
            height='100%'
            overflow="auto"
            alignItems="start"
            paddingTop={5}
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

                {/* <Switch
                  onChange={changeTheme}
                  checked={isDarkTheme}
                  color="default"
                /> */}
                <SimpleThemeToggler
                  themeToggler={changeTheme}
                  isDarkTheme={isDarkTheme}
                />
              </Stack>
            </Stack>
            <TodoList />
            <CompletedList />
            <AddTodoDialog />
            <Copyright />
          </Stack>
        </Container>
      </ConfirmProvider>
    </ThemeProvider >
  );
}

export default App;