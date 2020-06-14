import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "react-modal-hook";
import { Button,Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import { fetchOrder, promoteOrder } from "../../actions/orderAction";
import "./index.scss";
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

  const [nextData, setNextData] = useState(false);

  const [errorMsg, setErrorMsg] = useState("No Orders yet");

  let status;

  useEffect(() => {
    if (nextData) {
      fetchOrder(`limit=${query.limit}&skip=${query.skip}`)
				.then((payload) => {
					// set order to state
					let newOrder = [...orders, ...payload.data];
					setOrders(() => newOrder);
					setTotal(payload.total);
					let upper = page.upper;
					let lower = page.lower;
					setPage(() => ({
						upper: ++upper,
						lower: ++lower,
					}));
				})
				.catch((err) => {
					console.log("error occured");
					setErrorMsg("Error loading order, try again.");
				});
    }
  }, [query.skip,nextData, orders, page.lower, page.upper, query.limit]);

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
			.then((payload) => {
				// set order to state
				let newOrder = [...orders, ...payload.data];
				setOrders(() => newOrder);
				setTotal(payload.total);
				let upper = page.upper;
				setPage(() => ({
					...page,
					upper: ++upper,
				}));
			})
			.catch((err) => {
				console.log("error occured");
				setErrorMsg("Error loading orders, try again.");
			});
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

    // use modal hooks
    const { isOpen, openModal, closeModal, Modal } = useModal({
      background: 'rgba(0, 0, 0, 0.5)', // sets the color of the backdrop, if nothing is set, there will be no backdrop
      closeOnOutsideClick: true,
      closeOnEsc: true,
      isOpen: false,
      // `event` has all the fields that a normal `event` would have such as `event.target.value`, etc.
      // with the additional `portal` and `targetEl` added to it as seen in the examples below
      onOpen: (event) => {
        // can access: event.portal, event.targetEl, event.event, event.target, etc.
      },
      // `onClose` will not have an `event` unless you pass an `event` to `closePortal`
      onClose({ targetEl, event, portal }) {},
      // `targetEl` is the element that you either are attaching a `ref` to
      // or that you are putting `openPortal` or `togglePortal` or `closePortal` on

      // in addition, any event handler such as onClick, onMouseOver, etc will be handled the same
      onClick({ targetEl, event, portal }) {}
    })

    const [showDeleteModal, hideModal] = useModal(({ in: open, onExited }) => (
      <Dialog open={open} onExited={onExited} onClose={hideModal}>
        <DialogTitle>Delete User</DialogTitle>
        <select onChange={(e)=> {
          status = e.target.value;
          console.log(status)
        }}>
          {['Pending', 'In-Progress', 'Completed', 'Failed', 'Cancelled'].map(option => (<option>{option}</option>))}
        </select>
        <DialogActions>
          <Button onClick={hideModal}>Close</Button>
          <Button onClick={() => {
            promoteOrder();
            hideModal();
         }
          }>Update</Button>

        </DialogActions>
      </Dialog>
    ));


  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Orders</h4>
          <div className="orderBtn">
            <Link to="/dashboard/orders/create-order"
              className="redSolidBtn"
              style={{height:100,width:50,padding:10,borderRadius:3}}
            >
              Create Order
            </Link>
          </div>
        </div>
        <ul className="order-ul">

        </ul>
        <Card className="order-card">
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
                  <th scope="col">State</th>
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
                        {item.userId? item.userId.firstName + " " + item.userId.lastName: "User"}
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
                      <td className="action" onClick={showDeleteModal} >{item.status}</td>
                      {/* {isOpen && (
                      <Modal>
                        <div style={{
                          backgroundColor: 'white',
                          height: 200,

                        }}>
                          <select>
                          {['Pending', 'In-Progress', 'Completed', 'Failed', 'Cancelled'].map(option => (<option>{option}</option>))}
                          </select>
                          <div style={{
                            display: 'flex',
                            width: '100%',
                          }}>
                            <button onClick={closeModal}>close</button>
                            <button onClick={() => handleDelete(item._id)} >Yes, Delete</button>
                          </div>
                        </div>
                      </Modal>
                    )} */}

                    </tr>
                  ))
                ) : (
                  <tr>
                      <td>{errorMsg}</td>
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
