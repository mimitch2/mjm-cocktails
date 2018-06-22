import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
// import lime from '@material-ui/core/colors/lime';
// import grey from '@material-ui/core/colors/grey';



export default createMuiTheme({
  palette: {
    primary: {
      light: red[800],
      main: red[800],
      dark: red[800],
      contrastText: '#fff',
    },
    secondary: indigo,
    error: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#fff',
    },
  },
});