import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../Components/Header';
import SideNav from '../Components/SideNav';

import Dashboard from '../Views/Dashboard';
import AllOrder from '../Views/Orders';
import Products from '../Views/Products';
import AddProducts from '../Views/Products/add';
import AbandonedCheckouts from '../Views/Orders/abandonedCheckout'

import './styles.scss';

export default props => {
  return (
    <div className="layout">
      <Header />
      <div className="row">
        <Router>
          <SideNav />
          <div className="main">
            <Switch>
              <Route path="/" component={Dashboard} exact></Route>
              <Route path="/orders" component={AllOrder} exact></Route>
              <Route exact path="/orders/abandoned" component={AbandonedCheckouts}></Route>
              <Route exact path="/products" component={Products}></Route>
              <Route exact path="/products/add" component={AddProducts}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};
