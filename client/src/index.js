import { HashRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './redux/store';

const store = configureStore();

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('root'),
);
