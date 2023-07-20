import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from './Copyright';
import TodoItem from './components/todo-item/todo-item';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ThemeToggler from './components/theme-toggler/theme-toggler';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#60569e',
      light: '#7f77b1',
      dark: '#433c6e',
      contrastText: 'white'
    },
    secondary: {
      main: 'b876f9',
      light: 'c691fa',
      dark: '8052ae',
      contrastText: 'white'
    }
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ maxWidth: 'lg', p: 0 }}>
        <Box sx={
          {
            bgcolor: 'primary.dark',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column'
          }
        }>
          <Box sx={
            {
              p: 2,
              borderBottom: '2px white solid',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }
          }>
            <Typography sx={{ color: 'primary.contrastText' }} variant="h4" component="h1" gutterBottom>
              My Todo App
            </Typography>
            <FormControlLabel sx={{ m: 0 }}
              control={<ThemeToggler sx={{ m: 1 }} defaultChecked />}
            />
          </Box>
          <TodoItem />
          <TodoItem />
          <IconButton
            sx={
              {
                color: "#B66FFD",
                width: 70
              }
            }
            aria-label='add'
          >
            <AddCircleIcon sx={{ fontSize: 60 }} />
          </IconButton>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
