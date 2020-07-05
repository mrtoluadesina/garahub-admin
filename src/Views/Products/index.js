import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
// import useModal from 'use-react-modal'
import { useModal } from "react-modal-hook";
import { Button,Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";

import axios from 'axios';

import Card from "../../Components/Card";
import Table from "../../Components/Table";
import ProductTab from "../../Components/AbandonedTab";

import {formattedDate} from "../../utils/helperFunc";

import "./styles.scss";
import { useSelector } from "react-redux";

import Add from "./add"


let itemId;
let productName;

export default props => {
													const {
														products: { products },
													} = useSelector((state) => state);

													products.filter((item) =>
														console.log(item.isDeleted === false)
													);

													const storage = localStorage.getItem(
														"persist:garahub"
													);
													const data = JSON.parse(storage);
													const user = JSON.parse(data.LoginReducer);
													const prod = JSON.parse(
														localStorage.getItem("productsData")
													);

													// Sort Array by desc Order
													let sortProd = prod.sort(function (
														a,
														b
													) {
														let dateA = new Date(a.createdAt);
														let dateB = new Date(b.createdAt);
														return dateB - dateA;
													});

													const [update, setUpdate] = useState(false)
													const [prods, setProds] = useState(sortProd);
													useEffect(() => {
														
													}, [prods]);

													const auth = {
														headers: {
															Authorization: `Bearer ${user.info.token}`,
														},
													};

													const handleEdit = (id) => {
														console.log(id);
													};

													const [showDeleteModal, hideModal] = useModal(
														({ in: open, onExited }) => (
															<Dialog
																open={open}
																onExited={onExited}
																onClose={hideModal}
															>
																<DialogTitle>Delete Product</DialogTitle>
																<DialogContent>
																	Are you Sure you want to delete this { productName }?
																</DialogContent>
																<DialogActions>
																	<Button onClick={hideModal}>Close</Button>
																	<Button
																		onClick={() => {
																			axios
																				.delete(
																					`${process.env.REACT_APP_BASE_URL}/api/v1/product/${itemId}`,
																					auth
																				)
																				.then(({data}) => {
																					// get product data from localstorage
																					const value = JSON.parse(localStorage.getItem('productsData')).filter(product => product._id !== data.payload._id);
																					// save back to localstorage
																					localStorage.setItem('productsData', JSON.stringify(value));
																					sortProd = value.sort(function (a,b) {
																						let dateA = new Date(a.createdAt);
																						let dateB = new Date(b.createdAt);
																						return dateB - dateA;
																					});
																					setProds(()=> sortProd)

																				});
																			hideModal();

																		}}
																	>
																		yes
																	</Button>
																</DialogActions>
															</Dialog>
														)
													);

													// edit discount
	const [showEditModal, hideEditModal] = useModal(({ in: open, onExited }) => (
		<Dialog open={open} onExited={onExited} onClose={hideEditModal}>
			<DialogTitle>Edit Product</DialogTitle>
			<DialogContent>
				<Add method="edit" object={prods.find(prod => prod._id === itemId)} closeModal={hideEditModal} updater={[update,setUpdate]}/>
				 {/* <EditForm discounts={discountDetails.find(discount => discount._id === discountId)}/> */}
			</DialogContent>
			<DialogActions>
				<Button onClick={hideEditModal}>Close</Button>
			</DialogActions>
		</Dialog>
 ));

													return (
														<div className="product-row">
															<div className="container">
																<div className="product-header">
																	<h4 className="product">Products</h4>
																	<div className="productbtn">
																		{/* <OrderButton value="Export" /> */}
																	</div>
																</div>
																<Card className="product-card">
																	<div className="all-product">
																		<ProductTab />
																	</div>
																	<Table>
																		<thead className="th-color">
																			<tr>
																				<th scope="col"></th>
																				<th
																					scope="col"
																					className="product-chevron"
																				>
																					Product
																				</th>
																				<th scope="col">Inventory</th>
																				<th scope="col">Brand</th>
																				<th scope="col">Date</th>
																				<th scope="col"></th>
																				<th scope="col"></th>
																			</tr>
																		</thead>
																		<tbody>
																			{prods
																				.filter(
																					(list) => list.isDeleted === false
																				)
																				.map((item, index) => (
																					<tr key={index}>
																						<td className="md-5">
																							<div className="product-image">
																								{item.images ? (
																									<img
																										src={item.images[0]}
																										alt="product"
																									/>
																								) : (
																									<Icon
																										path={item.images[0]}
																										className="product-icon"
																									></Icon>
																								)}
																							</div>
																						</td>
																						<td className="order-item">
																							
																								{item.name}
																						{" "}
																						</td>
																						<td>
																							<span className="color-orange">
																								{item.quantity}{" "}
																							</span>
																						</td>
																						<td className="color-dgray">
																							{item.brandName}
																						</td>
																						<td className="color-dgray date-md">
																							{formattedDate(item.createdAt)}
																						</td>
																						<td
																							className="crud edit"
																							onClick={() =>{
																								itemId = item._id;
																								showEditModal()
																							}
																							}
																						>
																							edit
																						</td>
																						<td
																							className="crud del"
																							onClick={() => {
																								itemId = item._id;
																								productName = item.name
																								showDeleteModal();
																							}}
																						>
																							delete
																						</td>
																					</tr>
																				))}
																		</tbody>
																	</Table>
																</Card>
															</div>
														</div>
													);
												};
