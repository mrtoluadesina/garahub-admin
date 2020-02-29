import React from "react";

import OrderButton from "../../Components/OrderButton/index";
import Dropdown from "../../Components/Dropdown/index";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Input from "../../Components/Input";
import TableData from "../../utils/tabledata";
import CustomersTab from "../../Components/CustomerTab";

import "./styles.scss";

export default props => {
  return (
    <div className="customer-row">
      <div className="container">
        <div className="customer-header">
          <h4 className="customer">Customers</h4>
          <div className="customerbtn">
            <OrderButton value="Add customer" />
          </div>
        </div>
        <ul className="customer-ul">
            <li className="export">Import customers</li>
            <li className="export">Export</li>
            <li>
            <Dropdown>
              <option>More Actions</option>
              <option>Open</option>
            </Dropdown>
          </li>
        </ul>
        <Card className="customer-card">
          <div className="all-customer">
            <CustomersTab />
          </div>
          <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <Input placeholder="Search customers"
              className="customer-filterbar" />
            <p className="sortBy">Sort by</p>
            <div className="update-status">
              <Dropdown>
                <option>Newest update</option>
              </Dropdown>
            </div>
          </div>
          <Table>
              <thead className="th-color">
                <tr>
                  <th className="checkbox" scope="col">
                    <input type="checkbox"></input>
                  </th>
                  <th scope="col">Showing 5,890 customers</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {TableData.customerData.map((item, index) => (
                  <tr key={index}>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td>
                      <span className="color-dgray customer-padding">{item.title}</span>
                      <span className="color-lgray"> {item.name}</span>
                    </td>
                    <td className="color-lgray">{item.order}</td>
                    <td className="color-lgray">{item.payment}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Card>
      </div>
    </div>
  );
};
