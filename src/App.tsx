import './App.scss';
import { Hello } from './components/hello';
import io from 'socket.io-client'
function App() {
  const socket = io();

  socket.on('chat message', (msg) => {
    window.scrollTo(0, document.body.scrollHeight)
  })
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;
