import React, { useEffect } from "react";

import OrderButton from "../../Components/OrderButton/index";
import Table from "../../Components/Table";
import Card from "../../Components/Card";

import "./styles.scss";

import { fetchDiscounts } from "../../actions/discountAction";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {

  const {
    discounts: { discounts },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, []);

  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Discounts</h4>
          <div className="orderBtn">
            <OrderButton value="Create Discount" />
          </div>
        </div>
        <Card className="order-card">
          <div>
            <Table>
              <thead className="th-color">
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Transaction Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Discount Name</th>
                  <th scope="col">Discount Type</th>
                  <th scope="col">Discount</th>
                </tr>
              </thead>
              <tbody>
                {discounts.length > 0 ? (
                  discounts.map((item, index) => (
                    <tr key={index}>
                      <td className="color-lgray">{index + 1}</td>
                      <td className="order-item">{item._id}</td>
                      <td className="color-lgray">{item.createdAt}</td>
                      <td className="color-dgray">{item.name}</td>
                      <td className="color-lgray">{item.type}</td>
                      <td className="color-dgray">{item.discount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <p>No Discounts Yet</p>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};
