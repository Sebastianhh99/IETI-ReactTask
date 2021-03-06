import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './resources/styles.css';
import { Login, TasksPage } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/tasks">
          <TasksPage/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
