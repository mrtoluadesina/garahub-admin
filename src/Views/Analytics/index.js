import React, { useState, useEffect } from "react";
import "./styles.scss";
import DataCard from "../../Components/DataCard";
import MasonryLayout from "../../Components/MasonryLayout";
import Card from "../../Components/Card";

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
        <div className="filter-data">
          <Card className="metrics-card">
            <h3>{productNumber}</h3>
            <p>Products</p>
          </Card>
          <Card className="metrics-card">
            <h3>{orderNumber}</h3>
            <p>Orders</p>
          </Card>
          <Card className="metrics-card">
            <h3>{discountNumber}</h3>
            <p>Discounts</p>
          </Card>
          <Card className="metrics-card">
            <h3>{customerNumber}</h3>
            <p>Customers</p>
          </Card>
        </div>
        <div className="content">
          <MasonryLayout>
            {state.chartData.map((item, index) => {
              return (
                <DataCard
                  data={item}
                  key={index}
                  statType={item}
                  title={item.toUpperCase()}
                  backgroundColor={""}
                  label={"Date"}
                />
              );
            })}
          </MasonryLayout>
        </div>
      </div>
    </div>
  );
};
