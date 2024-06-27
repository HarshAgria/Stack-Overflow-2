import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk, } from 'redux-thunk'
import Reducers from './reducers'
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createStore( Reducers, compose(applyMiddleware(thunk)));
// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <React.StrictMode>
  // <GoogleOAuthProvider clientId={clientId}>
  <GoogleOAuthProvider clientId="937596086879-l5j0d53rt9hvf6c0fq9vi3trv2u5g58f.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  </React.StrictMode>
  </Provider>
);
