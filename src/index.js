import React from 'react';
import {render} from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './index.css';
import App from './App';
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>,
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
