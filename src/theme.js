export const lightTheme = {
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: 'white',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#60569e',
      light: '#7f77b1',
      dark: '#433c6e',
      contrastText: 'white'
    },
    secondary: {
      main: '#b876f9',
      light: '#c691fa',
      dark: '#8052ae',
      contrastText: 'white'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#433c6e',
        },
      },
    },
  },
}

export const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#090426',
      light: '#3a3651',
      dark: '#06021a',
      contrastText: 'white'
    },
    secondary: {
      main: '#b876f9',
      light: '#c691fa',
      dark: '#8052ae',
      contrastText: 'white'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#06021a',
        },
      },
    },
  },
}
