import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import './App.scss';
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register';
import io from 'socket.io-client'
import { PrivateRoute } from './hoc/PrivateRoute';
import { Home } from './components/Home/Home';
import { ROUTES } from './constants/constants';
import { PublickRoute } from './hoc/PublickRoute';
function App() {
  const socket = io();

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
            isAuthenticated={false}
            exact
          />
          <PublickRoute
            restricted
            path={ROUTES.LOGIN}
            isAuthenticated={false}
            component={Login}
            exact
          />
          <PublickRoute
            restricted
            path={ROUTES.REGISTER}
            isAuthenticated={false}
            component={Register}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
