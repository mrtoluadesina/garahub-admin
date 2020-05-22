import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import { fetchOrders } from "../../actions/orderAction";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import {formattedDate} from "../../utils/helperFunc";

export default (props) => {
  const {
    orders: { orders },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  
  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Orders</h4>
          <div className="orderBtn">
            <Link to="/dashboard/orders/create-order" className="btn orderbtn">
              Create Order
            </Link>
          </div>
        </div>
        <ul className="order-ul">
         
        </ul>
        <Card className="order-card">
          {/* <div className="filter">
            <FilterBar
              placeholder="Filter Orders"
              className="allorder-filterbar"
            ></FilterBar>
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
          </div> */}
          <div>
            <Table>
              <thead className="th-color">
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Date</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Fulfilment</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((item, index) => (
                    <tr key={index}>
                      <td className="checkbox">{index + 1}</td>
                      <td className="color-lgray">
                        {formattedDate(item.createdAt)}
                      </td>
                      <td className="color-lgray">
                        {item.user.firstName + " " + item.user.lastName}
                      </td>
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
                      <td className="color-dgray">{item.actualAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Orders Yet</td>
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
