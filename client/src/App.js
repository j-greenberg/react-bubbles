import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/bubbles" component={BubblePage}/>
      </Router>
    </div>
  );
}

export default App;
