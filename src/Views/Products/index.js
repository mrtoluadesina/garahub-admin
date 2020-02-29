import React from "react";
import Icon from "@mdi/react";

import { mdiChevronUp, mdiChevronDown } from "@mdi/js";

import OrderButton from "../../Components/OrderButton/index";
import Dropdown from "../../Components/Dropdown/index";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Input from "../../Components/Input";
import TableData from "../../utils/tabledata";
import ProductTab from "../../Components/AbandonedTab";

import "./styles.scss";

export default props => {
  return (
    <div className="product-row">
      <div className="container">
        <div className="product-header">
          <h4 className="product">Products</h4>
          <div className="productbtn">
            <OrderButton value="Export" />
          </div>
        </div>
        <ul className="product-ul">
          <li className="export">Export</li>
          <li className="export">Import</li>
          <li>
            <Dropdown>
              <option>More Actions</option>
              <option>Open</option>
            </Dropdown>
          </li>
        </ul>
        <Card className="product-card">
          <div className="all-product">
            <ProductTab />
          </div>
          <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <Input placeholder="Search checkouts"
              className="product-filterbar" />
          </div>
          <Table>
              <thead className="th-color">
                <tr>
                  <th className="checkbox checkbox-border" scope="col">
                    <input type="checkbox"></input>
                    <Icon path={mdiChevronDown} className="chevron-icon"></Icon>
                  </th>
                  <th scope="col"></th>
                  <th scope="col" className="product-chevron">
                    Product
                  <Icon path={mdiChevronUp} className="chevron-icon"></Icon>
                  </th>
                  <th scope="col">Inventory</th>
                  <th scope="col">Type</th>
                  <th scope="col">Vendor</th>
                </tr>
              </thead>
              <tbody>
                {TableData.products.map(item => (
                  <tr>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td>
                      <div className="product-image">
                        <Icon path={item.image} className="product-icon"></Icon>
                      </div>
                    </td>
                    <td className="order-item">{item.product}</td>
                    <td>
                      <span className="color-orange">{item.number} </span>
                      <span className="color-lgray">{item.inventory}</span>
                      </td>
                    <td className="color-dgray">{item.type}</td>
                    <td className="color-dgray">{item.vendor}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Card>
      </div>
    </div>
  );
};
