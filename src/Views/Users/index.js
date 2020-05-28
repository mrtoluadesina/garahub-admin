import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import CustomButton from "../../Components/Button";

import {useSelector, useDispatch} from "react-redux";
import { fetchAllUsers, deleteUser} from "../../actions/userAction";
import { useModal } from "react-modal-hook";
import { Button,Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import Input from "../../Components/Input";
import { editUser } from "../../actions/userAction";



let userId;




const EditForm = (props) => {
  const dispatch = useDispatch();

  const handleEditUser = async (e) => {
    e.preventDefault();
		dispatch(editUser(adminUser, userId));
		console.log("State Updated");
	};

const [adminUser, setAdminUser] = useState({
    firstName: props.user.firstName,
  lastName: props.user.lastName,
    phone:props.user.phone,
DOB:(props.user.DOB).slice(0,10),
    email:props.user.email,
    password:props.user.password
})
  	//const formatDate = DOB.slice(0, 10);
const handleChange = ({ target }) => {
	setAdminUser({ ...adminUser, [target.name]: target.value });
	console.log(adminUser);
};
  return (
		<form className="form" onSubmit={handleEditUser}>
			<div className="row">
				<div className="col _big">
					<Card>
						<h3>Edit User</h3>
						<div className="form-group">
							<label>First Name </label>
							<Input
								type="text"
								name="firstName"
								placeholder="First Name"
								value={adminUser.firstName}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<Input
								type="text"
								name="lastName"
								placeholder="LastName"
								value={adminUser.lastName}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<Input
								type="email"
								name="email"
								placeholder="Email"
								value={adminUser.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Date of Birth </label>
							<Input type="date" name="DOB" value={adminUser.DOB} />
						</div>
						<div className="form-group">
							<label>Phone Number</label>
							<Input
								type="text"
								name="phone"
								placeholder="Phone Number"
								value={adminUser.phone}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Role</label>
							<Input type="text" name="role" placeholder="Role" />
						</div>
						<div className="form-group">
							<label>Password </label>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								value={adminUser.password}
								onChange={handleChange}
							/>
            </div>
					</Card>
				</div>
			</div>
			<div className="row">
				<CustomButton className="btn redSolidBtn" value="Edit User" />
			</div>
		</form>
	);
}



export default (props) => {

  const [showDeleteModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog open={open} onExited={onExited} onClose={hideModal}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        Are you Sure you want to delete User?
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal}>Close</Button>
        <Button onClick={() => {

dispatch(deleteUser(userId))
          console.log(users.filter((user) => user._id === userId));
          hideModal();
       }
        }>yes</Button>

      </DialogActions>
    </Dialog>
  ));

 const [showEditModal, hideEditModal] = useModal(({ in: open, onExited }) => (
		<Dialog open={open} onExited={onExited} onClose={hideEditModal}>
			<DialogTitle>Edit User</DialogTitle>
			<DialogContent>
				 <EditForm user={users.find((user) => user._id === userId)}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={hideEditModal}>Close</Button>
			</DialogActions>
		</Dialog>
 ));



  //console.log(user);
  const { user: { users } }
    = useSelector((state) => state);

  const dispatch = useDispatch();


  useEffect(async () => {
    dispatch(fetchAllUsers());
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    console.log("Edit button Clicked");

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
                    <CustomButton className="btn redSolidBtn" value="Edit" onClick={() => {
                      userId = item._id;
                      showEditModal();
                    }}/>
									</td>
									<td>
                    <CustomButton className="btn redSolidBtn" value="Delete" onClick={() => {
                      userId = item._id;
                      showDeleteModal();
                    }} />
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
