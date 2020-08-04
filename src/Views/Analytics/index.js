import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Customer from "../../assets/images/customer.png";
import Product from "../../assets/images/product.png";
import Order from "../../assets/images/orders.png";
import Discount from "../../assets/images/discount.png";
import RevenueChart from "../../Components/Chart";
import { BeatLoader } from "react-spinners";
import axios from "axios";


export default (props) => {
  const [dashboardData, setDashboardData] = useState({
    couponCount: 	JSON.parse(localStorage.getItem('couponsData'))? JSON.parse(localStorage.getItem('couponsData')).length : 0,
    adminCount: JSON.parse(localStorage.getItem('adminsData'))? JSON.parse(localStorage.getItem('adminsData')).length : 0,
    orderCount: JSON.parse(localStorage.getItem('ordersData'))? JSON.parse(localStorage.getItem('ordersData')).length : 0,
    productCount: JSON.parse(localStorage.getItem('productsData'))? JSON.parse(localStorage.getItem('productsData')).length : 0,
    customerCount: JSON.parse(localStorage.getItem('customersData'))? JSON.parse(localStorage.getItem('customersData')).length : 0
	});

	useEffect(() => {
		axios.get(process.env.REACT_APP_BASE_URL + `/api/v1/stats/dashboard`)
				 .then(res => {
					 const dist = res.data.payload;
					 const {coupons,admins,orders,products:prod,customers:custom,transactions} = dist;
					 localStorage.setItem('couponsData', JSON.stringify(coupons));
					 localStorage.setItem('productsData', JSON.stringify(prod));
					 localStorage.setItem('customersData', JSON.stringify(custom));
					 localStorage.setItem('ordersData', JSON.stringify(orders));
					 localStorage.setItem('transactionsData', JSON.stringify(transactions));
					 localStorage.setItem('adminsData', JSON.stringify(admins));
					 console.log({couponCount: coupons.length, adminCount: admins.length, orderCount: orders.length, productCount: prod.length, customerCount: custom.length})
	 
					 setDashboardData({couponCount: coupons.length, adminCount: admins.length, orderCount: orders.length, productCount: prod.length, customerCount: custom.length})
				 })
   
	}, []);


	const {couponCount,orderCount, productCount, customerCount} = dashboardData;
	
	console.log(dashboardData)

	return (
		<div className="admin-row">
			<div className="container">
				<div className="admin-header">
					<h2 className="title">Overview dashboard</h2>
				</div>

				<div className="overviewList">
					<Link to="/dashboard/products">
						<div className="col-lg overviewBox">
							<div className="viewContainer">
								<div className="overviewText">
									<h3>{productCount ? productCount : <BeatLoader color="#00315E" size={5} />}</h3>
									<p>Products</p>
								</div>
								<div className="viewImage">
									<img src={Product} alt="Product" />
								</div>
							</div>
						</div>
					</Link>

					<Link to="/dashboard/orders">
						<div className="lg-col overviewBox">
							<div className="viewContainer">
								<div className="overviewText">
									<h3>{orderCount ? orderCount : <BeatLoader color="#00315E" size={5} />}</h3>
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
									<h3>{couponCount ? couponCount : <BeatLoader color="#00315E" size={5} />}</h3>
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
									<h3>{customerCount ? customerCount : <BeatLoader color="#00315E" size={5} />}</h3>
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
