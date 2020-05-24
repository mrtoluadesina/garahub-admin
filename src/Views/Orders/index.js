import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import { fetchOrder } from "../../actions/orderAction";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import {formattedDate} from "../../utils/helperFunc";

export default (props) => {

  const [orderPage, setOrderPage] = useState({
    order: [],
    page: 1
  })
  const [orders, setOrders] =  useState([])
  const [query, setQuery] = useState({
    limit: 100, skip: 1
  }) 
  const [page, setPage] = useState({
    lower: 0,
    upper: 0
  })
  const [limit, setLimit] = useState(20)

  const [tot, setTotal] = useState(0)

  const [nextData, setNextData] = useState(false)
  // const {
  //   orders: { orders },
  // } = useSelector((state) => state);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (nextData) {
      fetchOrder(`limit=${query.limit}&skip=${query.skip}`)
      .then((payload)=> {
        // set order to state
        let newOrder = [ ...orders, ...payload.data ];
        setOrders(()=> newOrder);
        setTotal(payload.total);
        let upper = page.upper;
        let lower =  page.lower
        setPage(() => ({
          upper: ++upper, lower: ++lower
        }));
    })
    }
  }, [query.skip]);
  
  useEffect(() => {
    let upper = page.upper;
    let lower =  page.lower
    let order = orders.filter((trans, index) => {
      return(index >= lower*limit && index < upper*limit) 
    })
    setOrderPage(()=>({
      ...orderPage, order: order
    }))
  }, [page.upper])


  useEffect(() => {
    fetchOrder(`limit=${query.limit}&skip=${query.skip}`)
    .then((payload)=> {
      // set order to state
        let newOrder = [ ...orders, ...payload.data ];
        setOrders(()=> newOrder);
        setTotal(payload.total);
        let upper = page.upper;
      setPage(() => ({
       ...page, upper: ++upper
      }));
  
    })
  }, []);

  const next = () => {
    if ( page.upper*limit >= orders.length - 1) {
      // make call to fetch the next set
      if (query.skip * limit < tot) {
        setNextData(true)
        setQuery(()=> ({
          ...query, skip: query.skip + 1
        }))
      }
    } else {

      let upper = page.upper;
      let lower =  page.lower
      setPage(() => ({
        upper: ++upper, lower: ++lower
      }));
    }
    setOrderPage(()=>({
      ...orderPage, page: orderPage.page +1
    }))
    
  }

  const prev = () => {
    let upper = page.upper;
    let lower =  page.lower
    setPage(() => ({
      upper: --upper, lower: --lower
    }));
    setOrderPage(()=>({
      ...orderPage, page: orderPage.page - 1
    }))

  }
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
                  orderPage.order.map((item, index) => (
                    <tr key={item._id}>
                      <td className="checkbox">{index + 1}</td>
                      <td className="color-lgray">
                        {formattedDate(item.createdAt)}
                      </td>
                      <td className="color-lgray">
                        {item.userId.firstName + " " + item.userId.lastName}
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
                      <td className="color-dgray">{item.amount/100}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Orders Yet</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div>
            <button className="paginate" onClick={prev} disabled={orderPage.page < 2}>{"<"}</button>
              <span>{orderPage.page}</span>
              <button className="paginate"  onClick={next} disabled={orderPage.page * limit >= tot}>{">"}</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
