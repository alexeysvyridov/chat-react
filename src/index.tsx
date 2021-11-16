import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import axios from 'axios';
import applyInstanse  from './AxiosInterceptor';

const axios_instance = axios.create({
  baseURL:'http://localhost:3000',
  headers: {
      'Content-Type': 'application/json'
  }
})
applyInstanse(axios_instance);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

