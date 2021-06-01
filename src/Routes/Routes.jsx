import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './PrivateRoute'

import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'


const Routes = () => {
  return (
    <Switch>

      <Route path='/login' component={Login} />
      <PrivateRoute exact path='/' component={Home} />
     
    </Switch>
  );

}

export default Routes;