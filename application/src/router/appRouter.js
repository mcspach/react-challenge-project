import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import GuardedRoute from './guard.js';


const AppRouter = (props) => {
  console.log(props);
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <GuardedRoute path="/order" exact component={OrderForm} />
      <GuardedRoute path="/view-orders" exact component={ViewOrders} />
    </Router>
  );
}

export default AppRouter;
