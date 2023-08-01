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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#433c6e',
        },
      },
    },
    MuiButtonBase: {
      variants: [
        {
          props: { variant: 'action' },
          style: {
            backgroundColor: '#2b2645',
            color: 'white'
          }
        }
      ]
    }
  },
  palette: {
    mode: 'light',
    background: {
      default: '#7f77b1'
    },
    primary: {
      main: '#60569e',
      light: '#7f77b1',
      dark: '#433c6e',
      contrastText: 'white'
    },
    secondary: {
      main: '#6A56EA',
      light: '#A49AE6',
      dark: '#2E2666',
      contrastText: 'white'
    }
  },
}

export const darkTheme = {
  palette: {
    mode: 'dark',
    background: {
      default: '#3a3651'
    },
    primary: {
      main: '#090426',
      light: '#3a3651',
      dark: '#06021a',
      contrastText: 'white'
    },
    secondary: {
      main: '#3819E6',
      light: '#332A66',
      dark: '#7560EA',
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
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#c1b7ff'
        }
      }
    }
  },
}
