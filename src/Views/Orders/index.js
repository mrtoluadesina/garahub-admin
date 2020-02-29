import React from "react";
import Icon from "@mdi/react";

import { mdiMapMarker } from "@mdi/js";

import OrderButton from "../../Components/OrderButton/index";
import Dropdown from "../../Components/Dropdown/index";
import Card from "../../Components/Card";
import AllOrderTab from "../../Components/CardTab";
import FilterBar from "../../Components/FilterBar";
import Button from "../../Components/Button";
import Table from "../../Components/Table";
import TableData from "../../utils/tabledata";

import "./index.scss";

export default props => {
  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Orders</h4>
          <div className="orderBtn">
            <OrderButton value="Create Order" />
          </div>
        </div>
        <ul className="order-ul">
          <li className="export">Export</li>
          <li>
            <Dropdown>
              <option>More Actions</option>
              <option>Open</option>
            </Dropdown>
          </li>
        </ul>
        <Card className="order-card">
          <div className="all-order">
            <AllOrderTab>
              <div className="location">
                <li className="location-li">
                  <Icon path={mdiMapMarker} className="icon"></Icon>
                  <Dropdown>
                    <option>All Locations</option>
                    <option>Nigeria</option>
                  </Dropdown>
                </li>
              </div>
            </AllOrderTab>
          </div>
          <div className="filter">
            <FilterBar placeholder="Filter Orders" className="allorder-filterbar"></FilterBar>
            <div className="status">
              <Dropdown>
                <option>Status</option>
              </Dropdown>
            </div>
            <div className="status">
              <Dropdown>
                <option>Payment Status</option>
              </Dropdown>
            </div>
            <div className="status">
              <Dropdown>
                <option>Fulfilment Status</option>
              </Dropdown>
            </div>
            <div className="status status-radius">
              <Dropdown>
                <option>More Filters</option>
              </Dropdown>
            </div>
            <Button value="Saved" className="savebtn"></Button>
            <Button value="Sort" className="sortbtn"></Button>
          </div>
          <div>
            <Table>
              <thead className="th-color">
                <tr>
                  <th className="checkbox" scope="col">
                    <input type="checkbox"></input>
                  </th>
                    <th scope="col">Order</th>
                    <th scope="col">Date</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Fulfilment</th>
                    <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {TableData.allOrderData.map((item, index) => (
                  <tr key={index}>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td className="order-item">{item.order}</td>
                    <td className="color-lgray">{item.date}</td>
                    <td className="color-lgray">{item.customer}</td>
                    <td className="Payment">
                      {item.payment === "Paid" ? (
                        <div className="paid">
                          <div className="paid-circle"></div>
                          Paid
                        </div>
                      ) : (
                        <div className="pending">
                          <div className="pending-circle"></div>
                          Pending
                        </div>
                      )}
                    </td>
                    <td className="Fulfilment">
                      {item.fulfilment === "Fulfilled" ? (
                        <div className="fulfilled">
                          <div className="fulfilled-circle"></div>
                          Fulfilled
                        </div>
                      ) : (
                        <div className="unfulfilled">
                          <div className="unfulfilled-circle"></div>
                          Unfulfilled
                        </div>
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
