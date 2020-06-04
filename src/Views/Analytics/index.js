import React, { useState, useEffect } from "react";
import "./styles.scss";
import DataCard from "../../Components/DataCard";
import MasonryLayout from "../../Components/MasonryLayout";
import Customer from "../../assets/images/customer.png";
import Product from "../../assets/images/product.png";
import Order from "../../assets/images/orders.png";
import Discount from "../../assets/images/discount.png";
import RevenueChart from "../../Components/Chart"
export default (props) => {
  const [state, setState] = useState({
    // data: {},
    chartData: ["revenue", "order", "revenue"],
  });

  const [productNumber, setProductNumber] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [discountNumber, setDiscountNumber] = useState(0);
  const [customerNumber, setCustomerNumber] = useState(0);

  const storage = localStorage.getItem("persist:garahub");
  const data = JSON.parse(storage);

  const products = JSON.parse(data.products);
  const orders = JSON.parse(data.orders);
  const discounts = JSON.parse(data.discounts);
  const customers = JSON.parse(data.customer);

  useEffect(() => {
    setProductNumber(products.products.length);
    setOrderNumber(orders.orders.length)
    setDiscountNumber(discounts.discounts.length)
    setCustomerNumber(customers.customers.length)
  }, []);

  return (
		<div className="admin-row">
			<div className="container">
				<div className="admin-header">
					<h2 className="title">Overview dashboard</h2>
        </div>

				<div className="overviewList">
          <div className="col-lg overviewBox">
            <div className="viewContainer">
              	<div className="overviewText">
							<h3>{productNumber}</h3>
							<p>Products</p>
						</div>
						<div className="viewImage">
							<img src={Product} />
						</div>
              </div>
					</div>
					<div className="lg-col overviewBox">
						<div className="viewContainer">
							<div className="overviewText">
								<h3>{!orderNumber ? 0 : orderNumber}</h3>
								<p>Orders</p>
							</div>
							<div className="viewImage">
								<img src={Order} />
							</div>
						</div>
					</div>
					<div className="lg-col overviewBox">
						<div className="viewContainer">
							<div className="overviewText">
								<h3>{!discountNumber ? 0 : discountNumber}</h3>
								<p>Discounts</p>
							</div>
							<div className="viewImage">
								<img src={Discount} />
							</div>
						</div>
					</div>
					<div className="lg-col overviewBox">
						<div className="viewContainer">
							<div className="overviewText">
								<h3>{customerNumber}</h3>
								<p>Customers</p>
							</div>
							<div className="viewImage">
								<img src={Customer} />
							</div>
						</div>
					</div>
				</div>
				<div className="content">

					{/* <MasonryLayout>
						{state.chartData.map((item, index) => {
							return (
								<DataCard
									data={item}
									key={index}
									statType={item}
									title={item.toUpperCase()}
									backgroundColor={"blue"}
									label={"Date"}
								/>
							);
						})}
					</MasonryLayout> */}
          <RevenueChart />
				</div>
			</div>
		</div>
	);
};
