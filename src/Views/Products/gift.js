import React from "react";
import Icon from "@mdi/react";

import { mdiChevronDown } from "@mdi/js";

import OrderButton from "../../Components/OrderButton/index";
import Dropdown from "../../Components/Dropdown/index";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Input from "../../Components/Input";
import TableData from "../../utils/tabledata";
import GiftTab from "../../Components/GiftTab";

import "./styles.scss";

export default props => {
  return (
    <div className="product-row">
      <div className="container">
        <div className="product-header">
          <h4 className="product">Products</h4>
          <div className="productbtn">
            <OrderButton value="View products" />
          </div>
        </div>
        <ul className="product-ul">
          <li className="export">Export</li>
          <li className="export">Manage gift card products</li>
        </ul>
        <Card className="gift-alert">
            <p className="alert-exclamation">
                <span className="exclamation">!</span>
                You don't have any gift card products.
            </p>
            <p className="create-gift">
                <span className="color-blue">Create one</span> to sell it in your store.
            </p>
        </Card>
        <Card className="gift-card product-card">
          <div className="all-product">
            <GiftTab />
          </div>
          <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <Input placeholder="Search gift cards"
              className="product-filterbar" />
          </div>
          <Table>
              <thead className="th-color">
                <tr>
                  <th className="checkbox checkbox-border" scope="col">
                    <input type="checkbox"></input>
                    <Icon path={mdiChevronDown} className="chevron-icon"></Icon>
                  </th>
                  <th scope="col">Code</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Expires</th>
                  <th scope="col">Initial value</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                {TableData.giftData.map((item, index) => (
                  <tr key={index}>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td>
                      <span className="color-lgray"> {item.pin} </span>
                      <span className="color-dgray"> {item.token} </span>
                      <span className="color-dgray"> {item.status}</span>
                    </td>
                    <td className="color-dgray">{item.customer}</td>
                    <td className="color-dgray">{item.expires}</td>
                    <td className="color-dgray">{item.initialValue}</td>
                    <td className="color-dgray">{item.balance}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p className="lgray gift-footer">Gift Cards will appear here after their order is fulfilled. 
                <span className="color-blue"> View orders.</span>
            </p>
        </Card>
      </div>
    </div>
  );
};
