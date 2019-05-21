import React from 'react';
import Home from './components/Home';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {main: '#F76902'},
    secondary: {
      main: '#000000'
    }
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Home />
    </MuiThemeProvider>
  );
}

export default App;
