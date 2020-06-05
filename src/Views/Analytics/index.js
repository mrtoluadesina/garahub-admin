import React, { useState, useEffect } from "react";
import "./styles.scss";
import Customer from "../../assets/images/customer.png";
import Product from "../../assets/images/product.png";
import Order from "../../assets/images/orders.png";
import Discount from "../../assets/images/discount.png";
import RevenueChart from "../../Components/Chart"
import {XYPlot, VerticalBarSeries } from 'react-vis';



export default (props) => {

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
  const data1 = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
  ];

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
          <RevenueChart />
     <div className="App">
        <XYPlot height={300} width={300}>
          <VerticalBarSeries
            data={data1}
            color="blue"
            opacity={0.4}
            stroke="black"
          />
        </XYPlot>
      </div>
				</div>
			</div>
		</div>

	);
};
