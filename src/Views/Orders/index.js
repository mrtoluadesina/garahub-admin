import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from 'react-modal-hook';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import Card from '../../Components/Card';
import Table from '../../Components/Table';
import { fetchOrder, promoteOrder } from '../../actions/orderAction';
import './index.scss';
import "./orderModal.scss";
import { formattedDate } from '../../utils/helperFunc';

export default props => {
  const [orderPage, setOrderPage] = useState({
    order: [],
    page: 1,
  });
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState({
    limit: 100,
    skip: 1,
  });
  const [page, setPage] = useState({
    lower: 0,
    upper: 0,
  });
  const [limit, setLimit] = useState(20);

  const [tot, setTotal] = useState(0);

  const [nextData, setNextData] = useState(false);

  const [errorMsg, setErrorMsg] = useState('No Orders yet');

  let status;

  // useEffect(() => {
  //   if (nextData) {
  //     fetchOrder(`limit=${query.limit}&skip=${query.skip}`)
  //       .then(payload => {
  //         // set order to state
  //         let newOrder = [...orders, ...payload.data];
  //         setOrders(() => newOrder);
  //         setTotal(payload.total);
  //         let upper = page.upper;
  //         let lower = page.lower;
  //         setPage(() => ({
  //           upper: ++upper,
  //           lower: ++lower,
  //         }));
  //       })
  //       .catch(err => {
  //         console.log('error occured');
  //         setErrorMsg('Error loading order, try again.');
  //       });
  //   }
  // }, [query.skip, nextData, orders, page.lower, page.upper, query.limit]);

  // useEffect(() => {
  //   let upper = page.upper;
  //   let lower = page.lower;

  //   let order = orders.filter((trans, index) => {
  //     return index >= lower * limit && index < upper * limit;
  //   });

  //   setOrderPage(() => ({
  //     ...orderPage,
  //     order: order,
  //   }));
  // }, [page.upper, limit, orderPage, orders, page.lower]);

  // useEffect(() => {
  //   fetchOrder(`limit=${query.limit}&skip=${query.skip}`)
  //     .then(payload => {
  //       // set order to state
  //       let newOrder = [...orders, ...payload.data];
  //       setOrders(() => newOrder);
  //       setTotal(payload.total);
  //       let upper = page.upper;
  //       setPage(() => ({
  //         ...page,
  //         upper: ++upper,
  //       }));
  //     })
  //     .catch(err => {
  //       console.log('error occured');
  //       setErrorMsg('Error loading orders, try again.');
  //     });
  // }, [orders, page, query.limit, query.skip]);

  const next = () => {
    if (page.upper * limit >= orders.length - 1) {
      // make call to fetch the next set
      if (query.skip * limit < tot) {
        setNextData(true);
        setQuery(() => ({
          ...query,
          skip: query.skip + 1,
        }));
      }
    } else {
      let upper = page.upper;
      let lower = page.lower;
      setPage(() => ({
        upper: ++upper,
        lower: ++lower,
      }));
    }
    setOrderPage(() => ({
      ...orderPage,
      page: orderPage.page + 1,
    }));
  };

  const prev = () => {
    let upper = page.upper;
    let lower = page.lower;
    setPage(() => ({
      upper: --upper,
      lower: --lower,
    }));
    setOrderPage(() => ({
      ...orderPage,
      page: orderPage.page - 1,
    }));
  };

  const [showDeleteModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog open={open} onExited={onExited} onClose={hideModal}>
      <DialogTitle>Delete User</DialogTitle>
      <select
        onChange={e => {
          status = e.target.value;
          console.log(status);
        }}
      >
        {['Pending', 'In-Progress', 'Completed', 'Failed', 'Cancelled'].map(option => (
          <option>{option}</option>
        ))}
      </select>
      <DialogActions>
        <Button onClick={hideModal}>Close</Button>
        <Button
          onClick={() => {
            promoteOrder();
            hideModal();
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  ));

  const ordersDetails = JSON.parse(localStorage.getItem('ordersData'));

  // Sort Array by desc Order
  const sortOrder = ordersDetails.sort(function (a, b) {
    let dateA = new Date(a.createdAt);
    let dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
		<div className="order-row">
			<div className="container">
				<div className="order-header">
					<h4 className="order">Orders</h4>
					<div className="orderBtn">
						<Link
							to="/dashboard/orders/create-order"
							className="redSolidBtn"
							style={{
								height: 100,
								width: 50,
								padding: 10,
								borderRadius: 3,
							}}
						>
							Create Order
						</Link>
					</div>
				</div>
				<ul className="order-ul"></ul>
				<Card className="order-card">
					<div>
						<Table>
							<thead className="th-color">
								<tr>
									<th scope="col">S/N</th>
									<th scope="col">ID</th>
									<th scope="col">Date</th>
									<th scope="col">Customer</th>
									<th scope="col">Payment</th>
									<th scope="col">Fulfilment</th>
									<th scope="col">Total</th>
									<th scope="col">State</th>
								</tr>
							</thead>
							<tbody>
								{sortOrder.length > 0 ? (
									sortOrder.map((item, index) => (
										<tr key={item._id}>
											<td className="checkbox">{index + 1}</td>
											<td className="color-lgray">
												<a href="#modal" style={{ color: "blue" }}>
													{item._id}
												</a>
											</td>
											<td className="color-lgray">
												{formattedDate(item.createdAt)}
											</td>
											<td className="color-lgray">
												{item.userId
													? item.userId.firstName + " " + item.userId.lastName
													: "User"}
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
											<td className="color-dgray">{item.amount / 100}</td>
											<td className="action" onClick={showDeleteModal}>
												{item.status}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td>{errorMsg}</td>
									</tr>
								)}
							</tbody>
						</Table>{" "}
						

						<div>
							<button
								className="paginate"
								onClick={prev}
								disabled={orderPage.page < 2}
							>
								{"<"}
							</button>
							<span>{orderPage.page}</span>
							<button
								className="paginate"
								onClick={next}
								disabled={orderPage.page * limit >= tot}
							>
								{">"}
							</button>
						</div>
					</div>
				</Card>
        {sortOrder.map((item, index) => (
							<div key={index} className="modal" id="modal">
								<div className="modal-container">
									<h2>Orders Details</h2>
									<div
										style={{
											marginTop: "2rem",
										}}
									>
										<p style={{ lineHeight: "2rem" }}>
											 Id: {item._id}
										</p>
                    	<p style={{ lineHeight: "2rem" }}>
											Created At: {item && formattedDate(item.createdAt)}
                    </p>
										<p style={{ lineHeight: "2rem" }}>
											Updated At: {item && formattedDate(item.updatedAt)}
                    </p>

										<p style={{ lineHeight: "2rem" }}>Status:{item.status}</p>
										<p style={{ lineHeight: "2rem" }}>
											Quantity:{item.quantity || "null"}
										</p>
										<p style={{ lineHeight: "2rem" }}>
											Amount: {item.amount}
										</p>
										
									</div>

									<div
										style={{
											marginTop: "2rem",
											color: "red",
											textDecoration: "underline",
										}}
									>
										<a href="#modal-close">Close</a>
									</div>
								</div>
							</div>
						))}
			</div>
		</div>
	);
};
