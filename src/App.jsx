import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { useState, useEffect } from 'react';
import Home from './pages/home/home';
import { useRecoilState } from 'recoil';
import { themeState } from './state/theme.recoil';
import Copyright from './Copyright';
import Auth from './pages/authentication/auth';
import NavBar from './components/navbar/navbar';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';
import ImportantList from './components/important-list/important-list';
import PersonalList from './components/personal-list/personal-list';
import WorkList from './components/work-list/work-list';

const App = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const isDarkTheme = theme === 'dark';

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
      <CssBaseline />
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '8% 85% 7%',
          height: '100vh'
        }}
      >
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='important' element={<ImportantList />} />
            <Route path='personal' element={<PersonalList />} />
            <Route path='work' element={<WorkList />} />
          </Route>
        </Routes>
        <Copyright />
      </div>
    </ThemeProvider >
  );
}

export default App;