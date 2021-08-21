import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import './App.scss';
// import { Hello } from './components/hello';
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register';
import io from 'socket.io-client'
function App() {
  const socket = io();

  socket.on('chat message', (msg) => {
    window.scrollTo(0, document.body.scrollHeight)
  })
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
      {/* <Hello /> */}
    </div>
  );
}

export default App;
