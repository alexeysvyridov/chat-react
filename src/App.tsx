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
function App() {
  const socket = io();
  const { isAuthenticated } = useTypeSelector(state => state.loginReducer)
  socket.on('chat message', (msg) => {
    window.scrollTo(0, document.body.scrollHeight)
  })
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute
            path={ROUTES.HOME}
            component={Home}
            isAuthenticated={isAuthenticated}
            exact
          />
          <PublickRoute
            restricted
            path={ROUTES.LOGIN}
            isAuthenticated={isAuthenticated}
            component={Login}
            exact
          />
          <PublickRoute
            restricted
            path={ROUTES.REGISTER}
            isAuthenticated={isAuthenticated}
            component={Register}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
