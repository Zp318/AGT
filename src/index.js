import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './ready/auto.js';
import $ from 'jquery';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import appReducers from './reducers/reducers';

let store = createStore(appReducers);
window.isRatePage = $("#isSuccessKqi").val();
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
