import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../Components/Header";
import SideNav from "../Components/SideNav";

import Discounts from "../Views/Discounts";
import CreateDiscounts from "../Views/Discounts/add";
import AllTransactions from "../Views/Transactions";
import AllOrder from "../Views/Orders";
import Products from "../Views/Products";
import AddProducts from "../Views/Products/add";
import Customers from "../Views/Customers";
import Users from "../Views/Users";
import AbandonedCheckouts from "../Views/Orders/abandonedCheckout";
import Analytics from "../Views/Analytics";
import Settings from "../Views/Settings";
import GiftCard from "../Views/Products/gift";
import CreateOrder from "../Views/Orders/add";
import CreateUser from "../Views/Users/create-user"
import "./styles.scss";
import { useSelector } from "react-redux";
import Edit from "../Views/Products/edit";

export default props => {
  const {
    LoginReducer: {
      success,
      user: { email }
    }
  } = useSelector(state => state);

  if (success === false) {
    props.history.push("/login");
  }

  return (
		<div className="layout">
			<Header admin={email} />
			<div className="row">
				<Router>
					<SideNav props={props} />
					<div className="main">
						<Switch>
							<Route path="/dashboard" component={Analytics} exact></Route>
							<Route
								path="/dashboard/transactions"
								component={AllTransactions}
								exact
							></Route>
							<Route
								path="/dashboard/orders"
								component={AllOrder}
								exact
							></Route>
							<Route
								path="/dashboard/orders/create-order"
								component={CreateOrder}
								exact
              ></Route>
							<Route
								path="/dashboard/users/create-user"
								component={CreateUser}
								exact
              ></Route>

							<Route
								exact
								path="/dashboard/orders/abandoned"
								component={AbandonedCheckouts}
							></Route>
							<Route
								exact
								path="/dashboard/products"
								component={Products}
							></Route>
							<Route
								exact
								path="/dashboard/products/add"
								component={AddProducts}
							></Route>
							<Route
								exact
								path="/dashboard/products/edit/:id"
								component={Edit}
							></Route>
							<Route
								exact
								path="/dashboard/products/gift"
								component={GiftCard}
							></Route>
							<Route
								exact
								path="/dashboard/customers"
								component={Customers}
							></Route>
							<Route
								exact
								path="/dashboard/users"
								component={Users}
							></Route>
							<Route exact path="/dashboard/discounts" component={Discounts} />
							<Route
								exact
								path="/dashboard/discounts/add"
								component={CreateDiscounts}
							/>
							<Route exact path="/dashboard/settings" component={Settings} />
						</Switch>
					</div>
				</Router>
			</div>
		</div>
	);
};
