import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import NavBar from "./components/NavBar";
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/todos" component={TodoApp} />
        <Redirect to="/todos" />
      </Switch>
    </div>
  );
}

export default App;
