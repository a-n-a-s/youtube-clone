import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./base.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./Redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
