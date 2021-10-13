import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import './App.scss';
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register';
import io from 'socket.io-client'
import { PrivateRoute } from './hoc/PrivateRoute';
import { Home } from './components/Home/Home';
import { ROUTES } from './constants/constants';
import { PublickRoute } from './hoc/PublickRoute';
import { useTypeSelector } from './hooks/useTypeSelector';

import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createTheme";

import { loadStorage } from './localStorage'
import { useTypeDispatch } from './hooks/useTypeDispatch';
import { loginSuccess } from './components/Login/redux/loginActionCreators';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const theme = createMuiTheme();

function App() {
  const socket = io();
  const { isAuthenticated } = useTypeSelector(state => state.loginReducer)
  const dispatch = useTypeDispatch()
  socket.on('chat message', (msg) => {
    window.scrollTo(0, document.body.scrollHeight)
  })

  useEffect(() => {
    let userAuth = loadStorage('auth')
    if (!userAuth?.isAuthenticated) return
    let user = loadStorage('auth')
    dispatch(loginSuccess(user))
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <PublickRoute
              restricted
              path={ROUTES.LOGIN}
              isAuthenticated={isAuthenticated}
              component={Login}
              exact
            />
            <PrivateRoute
              path={ROUTES.HOME}
              component={Home}
              isAuthenticated={isAuthenticated}
              exact
            />
            <PublickRoute
              restricted
              path={ROUTES.REGISTER}
              isAuthenticated={isAuthenticated}
              component={Register}
              exact
            />
            <Redirect from="*" to="/login" />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>

  );
}

export default App;
