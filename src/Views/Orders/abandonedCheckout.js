import React from "react";
import Icon from "@mdi/react";

import { mdiChevronLeft, mdiChevronDown } from "@mdi/js";

import OrderButton from "../../Components/OrderButton/index";
import Dropdown from "../../Components/Dropdown/index";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Input from "../../Components/Input";
import TableData from "../../utils/tabledata";
import AbandonedTab from "../../Components/AbandonedTab";

import "./index.scss";

export default props => {
  return (
    <div className="order-row">
      <div className="container">
        <div className="previous">
          <Icon path={mdiChevronLeft} className="chevron-icon"></Icon>
          Orders
        </div>
        <div className="order-header">
          <h4 className="order">Abandoned Checkouts</h4>
          <div className="draftbtn">
            <OrderButton value="Export" />
          </div>
        </div>
        <Card className="order-card">
          <div className="all-order">
            <AbandonedTab />
          </div>
          <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <Input placeholder="Search checkouts"
              className="draft-filterbar" />
          </div>
          <div>
            <Table>
              <thead className="th-color">
                <tr>
                  <th className="checkbox checkbox-border" scope="col">
                    <input type="checkbox"></input>
                    <Icon path={mdiChevronDown} className="chevron-icon"></Icon>
                  </th>
                    <th scope="col">Checkout</th>
                    <th scope="col">Date</th>
                    <th scope="col">Place by</th>
                    <th scope="col">Email status</th>
                    <th scope="col">Recovery status</th>
                    <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {TableData.abondonedData.map((item, index) => (
                  <tr key={index}>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td className="order-item">{item.checkout}</td>
                    <td className="color-lgray">{item.date}</td>
                    <td className="color-dgray">{item.placedBy}</td>
                    <td>
                      {item.emailStatus === "Not Sent" ? (
                        <div className="recovery">Not Sent</div>
                      ) : (
                        <div className="paid">Sent</div>
                      )}
                    </td>
                    <td>
                      {item.recoverStatus === "Not Recovered" ? (
                        <div className="recovery">Not Recovered</div>
                      ) : (
                        <div className="paid">Recovered</div>
                      )}
                    </td>
                    <td className="color-dgray">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};
