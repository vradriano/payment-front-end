import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Roboto Condensed',
      'Dancing Script',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#000',
      light: '#fff'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})