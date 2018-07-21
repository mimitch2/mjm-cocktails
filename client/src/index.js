import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './AppContainer';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import {Provider} from "react-redux";

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root"),
  registerServiceWorker()
);
