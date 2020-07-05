import React, { useEffect, useState } from "react";

import Table from "../../Components/Table";
import Card from "../../Components/Card";
import { formattedDate } from "../../utils/helperFunc";
import "./index.scss";
import { fetchTransaction } from "../../actions/transactionAction";
import "./modal.scss";

export default (props) => {
	let getTransaction;
	const [trans, setTrans] = useState({
		transacts: [],
		page: 1,
	});
	const [transact, setTransaction] = useState([]);
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

	const [errorMsg, setErrorMsg] = useState("No Transaction yet");

	useEffect(() => {
		fetchTransaction(`limit=${query.limit}&skip=${query.skip}`)
			.then((payload) => {
				// set transaction to state
				let newTransact = [...transact, ...payload.data];
				setTransaction(() => newTransact);
				setTotal(payload.total);
				let upper = page.upper;
				setPage(() => ({
					...page,
					upper: ++upper,
				}));
			})
			.catch((err) => {
				setErrorMsg("Error loading transactions, try again.");
			});
	}, []);

	useEffect(() => {
		if (nextData) {
			fetchTransaction(`limit=${query.limit}&skip=${query.skip}`)
				.then((payload) => {
					if (payload.data) {
						// set transaction to state
						console.log("error", payload);
						let newTransact = [...transact, ...payload.data];
						setTransaction(() => newTransact);
						setTotal(payload.total);
						let upper = page.upper;
						let lower = page.lower;
						setPage(() => ({
							upper: ++upper,
							lower: ++lower,
						}));
					} else {
					}
				})
				.catch((err) => {
					console.log("error occured");
					setErrorMsg("Error loading transactions, try again.");
				});
		}
	}, [query.skip]);

	useEffect(() => {
		let upper = page.upper;
		let lower = page.lower;
		let transacts = transact.filter((trans, index) => {
			return index >= lower * limit && index < upper * limit;
		});
		setTrans(() => ({
			...trans,
			transacts: transacts,
		}));
	}, [page.upper]);

	const next = () => {
		if (page.upper * limit >= transact.length - 1) {
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
		setTrans(() => ({
			...trans,
			page: trans.page + 1,
		}));
	};

	const prev = () => {
		let upper = page.upper;
		let lower = page.lower;
		setPage(() => ({
			upper: --upper,
			lower: --lower,
		}));
		setTrans(() => ({
			...trans,
			page: trans.page - 1,
		}));
	};

  const transactDetails = JSON.parse(localStorage.getItem("transactionsData"));

// Sort Array by desc Order
	const sortTrans = transactDetails.sort(function (a, b) {
    let dateA = new Date(a.createdAt);
		let dateB = new Date(b.createdAt);
		return dateB - dateA;
	});

	const [transactzz, setTransactzz] = useState([{}]);

	return (
		<div className="order-row">
			<div className="container">
				<div className="order-header">
					<h4 className="order">Transactions</h4>
					<div className="orderBtn">
						<button>Refresh</button>
					</div>
				</div>
				<Card className="order-card">
					<div>
						<Table>
							<thead className="th-color">
								<tr>
									<th scope="col">S/N</th>
									<th scope="col">Transaction Id</th>
									<th scope="col">Date</th>
									<th scope="col">Transaction Quantity</th>
									<th scope="col">Customer</th>
									<th scope="col">Total</th>
								</tr>
							</thead>
							<tbody>
								{sortTrans.length > 0 ? (
									sortTrans.map((item, index) => (
										<tr key={index}>
											<td className="checkbox">{index + 1}</td>
											<td
												className="order-item"
												onClick={() => {
													getTransaction = transactDetails.filter(
														(tras) => tras._id === item._id
													);
													setTransactzz(getTransaction);
												}}
											>
												<a href="#modal">{item._id}</a>
											</td>
											<td className="color-lgray">
												{formattedDate(item.createdAt)}
											</td>
											<td className="color-dgray">{item.items.length}</td>
											<td className="color-lgray">
												{item.user
													? `${item.user.firstName} ${item.user.lastName}`
													: "User"}
											</td>
											<td className="color-dgray">
												{item.chargedAmount / 100}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan="6">
											<p>{errorMsg}</p>
										</td>
									</tr>
								)}
							</tbody>
						</Table>
						{transactzz.map((item, index) => {
							const [more, setMore] = useState(false)
							return (
							<div key={index} className="modal" id="modal">
								<div className="modal-container">
									<h2>Transaction Details</h2>
									{item._id? <div
										style={{
											marginTop: "2rem",
											maxHeight: "400px",
											overflow: "scroll"
											
										}}
									>
										<p style={{ lineHeight: "2rem" }}>
											Transaction Id: {item._id}
										</p>
										<p style={{ lineHeight: "2rem" }}>Status: {item.status}</p>

										<p style={{ lineHeight: "2rem" }}>
											Actual Amount: {item.actualAmount/100}
										</p>
										<p style={{ lineHeight: "2rem" }}>
											Amount Paid: {item.paidAmount/100}
										</p>
										<p style={{ lineHeight: "2rem" }}>
										Charged Amount : {item.chargedAmount/100}
										</p>
										
										<h4>Customer Details</h4>
										{/* <p style={{ lineHeight: "2rem" }}>
											Created At: {item.user && formattedDate(item.user.createdAt)}
                    </p>
										<p style={{ lineHeight: "2rem" }}>
											Updated At: {item.user && formattedDate(item.user.updatedAt)}
                    </p> */}
										<p style={{ lineHeight: "2rem" }}>
											FirstName: {item.user && item.user.firstName}
										</p>
										<p style={{ lineHeight: "2rem" }}>
											LastName: {item.user && item.user.lastName}
										</p>

										<h4>Items</h4>
										<table>
												<tbody>
													{item.items && item.items.map((ite)=>(<tr>
														<td>
															{ite.productDetailsId.name}
														</td>
														<td>
															: {ite.quantity}
														</td>
													</tr>))}
													<tr>
														<td>Total Quantity</td>
														<td>: {item.items && item.items.reduce((acc, val)=> acc + val.quantity, 0)}</td>
													</tr>
												</tbody>
											</table>

										<button onClick={()=>{setMore(!more)}}>More Records</button>
										{more && <div>
											<h4>Remarks</h4>
											{item.remarks.map(data => (<div>
												<p>{data.remark}</p>
												<p>Time: {data.time.split("T").map((data, index)=>{
													if (index === 0) { return data; };
													return data.split(".")[0]
												}).join(" ")}</p>
												<hr/>
											</div>))}
										</div>} 

									</div>: <div>No Data available</div>}


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
						)})}

						<div>
							<button
								className="paginate"
								onClick={prev}
								disabled={trans.page < 2}
							>
								{"<"}
							</button>
							<span>{trans.page}</span>
							<button
								className="paginate"
								onClick={next}
								disabled={trans.page * limit >= tot}
							>
								{">"}
							</button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};
