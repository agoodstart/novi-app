import "@fontsource/roboto";
import React from 'react';
import ReactDOM from 'react-dom';

import './css/variables.css';
import './css/base/base.css';
import './css/layout/grid.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
