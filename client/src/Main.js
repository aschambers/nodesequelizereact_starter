import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.js';
import Home from './views/Home/Home';
import Dashboard from './views/Dashboard/Dashboard';
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';

const Main = () => (
  <main>
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/Signup" component={Signup} />
      <PrivateRoute path="/Dashboard" component={Dashboard} />
      <Route path="/" component={Home} />
    </Switch>
  </main>
);

export default Main;