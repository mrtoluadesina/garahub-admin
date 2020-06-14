import React, { useState, useEffect } from "react";
import "./styles.scss";
import {Link} from "react-router-dom";
import Customer from "../../assets/images/customer.png";
import Product from "../../assets/images/product.png";
import Order from "../../assets/images/orders.png";
import Discount from "../../assets/images/discount.png";
import RevenueChart from "../../Components/Chart"
import { useDispatch,useSelector } from "react-redux";
import { fetchAllOrders } from "../../actions/orderAction";



export default (props) => {
														const [productNumber, setProductNumber] = useState(
															0
														);
														const [
															discountNumber,
															setDiscountNumber,
														] = useState(0);
														const [
															customerNumber,
															setCustomerNumber,
														] = useState(0);

														const storage = localStorage.getItem(
															"persist:garahub"
														);
														const data = JSON.parse(storage);

														const products = JSON.parse(data.products);
														const discounts = JSON.parse(data.discounts);
  const customers = JSON.parse(data.customer);
  let dispatch = useDispatch();
  const {
		orders: { orders },
  } = useSelector((state) => state);

														useEffect(() => {
															setProductNumber(products.products.length);
															setDiscountNumber(discounts.discounts.length);
															setCustomerNumber(customers.customers.length);
															dispatch(fetchAllOrders());
														},[products.products.length, discounts.discounts.length, customers.customers.length, dispatch]);



														return (
															<div className="admin-row">
																<div className="container">
																	<div className="admin-header">
																		<h2 className="title">
																			Overview dashboard
																		</h2>
																	</div>

																	<div className="overviewList">
																		<Link to="/dashboard/products">
																			<div className="col-lg overviewBox">
																				<div className="viewContainer">
																					<div className="overviewText">
																						<h3>{productNumber}</h3>
																						<p>Products</p>
																					</div>
																					<div className="viewImage">
																						<img src={Product} alt="Product"/>
																					</div>
																				</div>
																			</div>
																		</Link>

																		<Link to="/dashboard/orders">
																			<div className="lg-col overviewBox">
																				<div className="viewContainer">
																					<div className="overviewText">
                                            <h3>{orders.total}</h3>
																						<p>Orders</p>
																					</div>
																					<div className="viewImage">
																						<img src={Order} alt="Order" />
																					</div>
																				</div>
																			</div>
																		</Link>
																		<Link to="/dashboard/discounts">
																			<div className="lg-col overviewBox">
																				<div className="viewContainer">
																					<div className="overviewText">
																						<h3>
																							{!discountNumber
																								? 0
																								: discountNumber}
																						</h3>
																						<p>Discounts</p>
																					</div>
																					<div className="viewImage">
																						<img src={Discount} alt="discount" />
																					</div>
																				</div>
																			</div>
																		</Link>
																		<Link to="/dashboard/customers">
																			<div className="lg-col overviewBox">
																				<div className="viewContainer">
																					<div className="overviewText">
																						<h3>{customerNumber}</h3>
																						<p>Customers</p>
																					</div>
																					<div className="viewImage">
																						<img src={Customer} alt="Customer" />
																					</div>
																				</div>
																			</div>
																		</Link>
																	</div>
																	<div className="content">
																		<RevenueChart />
																	</div>
																</div>
															</div>
														);
													};
