import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Button from "../../Components/Button";

import {useSelector, useDispatch} from "react-redux";
import { fetchAllUsers} from "../../actions/userAction";
import { useModal } from "react-modal-hook";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";


export default (props) => {

  const {user: {users} }
  = useSelector((state) => state);

const dispatch = useDispatch();

const [user,setUser]=useState({
  firstName:"",
  lastName: "",
  email:"",
	phone: "",
	DOB: ""
})

useEffect(async () => {
  dispatch(fetchAllUsers());
}, []);

const handleEdit=(e)=>{
e.preventDefault();

console.log("Edit button Clicked")
};

const handleDelete=(e)=>{

  const id = e.target.dataset.value;

  const getDeleteItem=users.filter(user => user._id === id);

setUser({...user,firstName:getDeleteItem.firstName,lastName:getDeleteItem.lastName,email:getDeleteItem.email,DOB:getDeleteItem.DOB})
  console.log("Delete button Clicked");
  console.log(id)
};

	return (
		<div className="customer-row">
			<div className="container">
				<div className="customer-header">
					<h4 className="customer">Admin Users</h4>
					<div className="customerbtn">
						<Link to="/dashboard/users/create-user" className="btn orderbtn">
							Create User
						</Link>
					</div>
				</div>
				<Card className="customer-card">
					<div className="all-customer">
            <span>Showing {users.length} Admin Users</span>
					</div>
					<Table>
						<thead className="th-color">
							<tr>
								<th scope="col">S/N</th>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Phone</th>
								<th scope="col">Role</th>
							</tr>
						</thead>
						<tbody>
							{users.map((item, index) => (
								<tr key={item._id}>
									<td>{index + 1}</td>
									<td>
										<span className="color-dgray customer-padding">
											{item.firstName} {item.lastName}
										</span>
									</td>
									<td>
										<span className="color-lgray"> {item.email}</span>
									</td>
									<td className="color-lgray">{item.phone}</td>
									<td className="color-lgray">
										{item.isGuest ? "guest" : "member"}
									</td>
									<td>
										<Button className="btn redSolidBtn" value="Edit" onClick={handleEdit}/>
									</td>
									<td>
										<Button className="btn redSolidBtn" value="Delete" onClick={handleDelete} dataValue={item._id} />
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
