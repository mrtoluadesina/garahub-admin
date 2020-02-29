import React from "react";
import Icon from "@mdi/react";

import { mdiChevronLeft, mdiChevronDown } from "@mdi/js";

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
        
      </div>
    </div>
  );
};
