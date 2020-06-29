import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Customer from "../../assets/images/customer.png";
import Product from "../../assets/images/product.png";
import Order from "../../assets/images/orders.png";
import Discount from "../../assets/images/discount.png";
import RevenueChart from "../../Components/Chart";
import axios from "axios";


export default (props) => {
  const [dashboardData, setDashboardData] = useState({
    couponCount: 0,
    adminCount: 0,
    orderCount: 0,
    productCount: 0,
    customerCount: 0
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

        setDashboardData({couponCount: coupons.length, adminCount: admins.length, orderCount: orders.length, productCount: prod.length, customerCount: custom.length})
      })
	}, []);


  const {couponCount,orderCount, productCount, customerCount} = dashboardData;

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
									<h3>{productCount ? productCount : 0}</h3>
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
									<h3>{orderCount ? orderCount : 0}</h3>
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
									<h3>{couponCount ? couponCount : 0}</h3>
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
									<h3>{customerCount ? customerCount : 0}</h3>
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
