import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../Components/Header';
import SideNav from '../Components/SideNav';

import Dashboard from '../Views/Dashboard';
import AllOrder from '../Views/AllOrders';
import Products from '../Views/Products';
import Drafts from '../Views/Drafts';

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
              <Route exact path="/orders/drafts" component={Drafts}></Route>
              <Route exact path="/products" component={Products}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};
