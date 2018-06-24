import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
// import lime from '@material-ui/core/colors/lime';
// import grey from '@material-ui/core/colors/grey';



export default createMuiTheme({
  palette: {
    primary: red,
    secondary: indigo,
    error: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#fff',
    },
  },
});