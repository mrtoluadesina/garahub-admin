import React, {useEffect} from 'react';

import OrderButton from "../../Components/OrderButton/index";
import Table from "../../Components/Table";
import Card from "../../Components/Card";

import './index.scss';

import {fetchTransactions} from "../../actions/transactionAction";
import { useSelector, useDispatch } from "react-redux";

export default props => {

  const {
    transactions: { transactions }
  } = useSelector(state => state);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchTransactions())
  },[]) 

  console.log(transactions);
  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Transactions</h4>
          <div className="orderBtn">
            <OrderButton value="Create Order" />
          </div>
        </div>
        <Card className="order-card">
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
                {transactions.length > 0 ? (
                  transactions.map((item, index) => (
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
                ))) : (
                  <tr>
                    <p>No Transactions Yet</p>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}