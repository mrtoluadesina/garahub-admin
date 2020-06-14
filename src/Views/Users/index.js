import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import CustomButton from "../../Components/Button";
import "./index.scss";
import {useSelector, useDispatch} from "react-redux";
import { fetchAllUsers, deleteUser} from "../../actions/userAction";
import { useModal } from "react-modal-hook";
import { Button,Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import Input from "../../Components/Input";
import { editUser } from "../../actions/userAction";
import izitoast from "izitoast";
import Select from "react-select";

let userId;



//Edit Form on Modal
const EditForm = (props) => {

  const dispatch = useDispatch();
  const {
	user: { editSuccess },
} = useSelector((state) => state);

  //Edit User on Submit
  const handleEditUser = async (e) => {
    e.preventDefault();
		dispatch(editUser(adminUser, userId));

    if (editSuccess === true) {
      izitoast.show({
				messageColor: "white",
				backgroundColor: "green",
				titleColor: "white",
				timeout: 5000,
				position: "center",
				message: "User Edited Successfully ",
      });
    }
	};

  //Admin User Default State
const [adminUser, setAdminUser] = useState({
    firstName: props.user.firstName,
  lastName: props.user.lastName,
    phone:props.user.phone,
DOB:(props.user.DOB).slice(0,10),
    email:props.user.email,
  password: props.user.password,
role:props.user.role
})

  //Handle Input Select
const handleChange = ({ target }) => {
  setAdminUser({ ...adminUser, [target.name]: target.value });};

  //Handle Role Select
  const handleSelectChange = (value) => {
		if (value.value === "admin") {
			setAdminUser({ ...adminUser, role: 1 });
			return;
		}
		if (value.value === "editor") {
			setAdminUser({ ...adminUser, role: 2 });
			return;
		}
		if (value.value === "customerCare") {
			setAdminUser({ ...adminUser, role: 3 });
			return;
		}
  };

  //Role Select Options
  const roles = [
		{ value: "admin", label: "Admin" },
		{ value: "editor", label: "Editor" },
		{ value: "customerCare", label: "Customer Care" },
	];

  return (
		<form className="form" onSubmit={handleEditUser}>
			<Card className="modalContainer">
				<div className="form-group formContainer">
					<label>First Name </label>
					<Input
						className="formInput"
						type="text"
						name="firstName"
						placeholder="First Name"
						value={adminUser.firstName}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group formContainer">
					<label>Last Name</label>
					<Input
						type="text"
						name="lastName"
						placeholder="LastName"
						value={adminUser.lastName}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group formContainer">
					<label>Email</label>
					<Input
						type="email"
						name="email"
						placeholder="Email"
						value={adminUser.email}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group formContainer">
					<label>Date of Birth </label>
					<Input type="date" name="DOB" value={adminUser.DOB} />
				</div>
				<div className="form-group formContainer">
					<label>Phone Number</label>
					<Input
						type="text"
						name="phone"
						placeholder="Phone Number"
						value={adminUser.phone}
						onChange={handleChange}
					/>
				</div>
				<div className="selectBox">
					<label>Roles</label>
					<Select className="selectInput"
						options={roles}
						onChange={handleSelectChange}
						name="role"
            required
					/>
				</div>
				<div className="form-group formContainer">
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

      <div className="row editButton">
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
          dispatch(deleteUser(userId));
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


  const { user: { users} }
    = useSelector((state) => state);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);



	return (
		<div className="customer-row">
			<div className="container">
				<div className="customer-header">
					<h4 className="customer">Admin Users</h4>
					<div className="customerbtn">
            <Link to="/dashboard/users/create-user" style={{padding:10,borderRadius:5,width:50}} className="redSolidBtn">
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
                    {item.role === 1 && "Admin"}
                    {item.role === 2 && "Editor"}
                    {item.role === 3 && "Customer Care"}
                     {!item.role && "Super Admin"}
									</td>
									<td>
                    <CustomButton className="btn redSolidBtn" value="Edit" onClick={() => {
                      if (!item.role) {
                        izitoast.show({
                          messageColor: "white",
                          backgroundColor: "Red",
                          titleColor: "white",
                          timeout: 3000,
                          position: "center",
                          message: "Super Admin Cannot be Edited ",
                        });
                        return;
                      }
                      userId = item._id;
                      showEditModal();
                    }
                    }
                    />
									</td>
									<td>
                    <CustomButton className="btn redSolidBtn" value="Delete" onClick={() => {
                      if (!item.role) {
                        izitoast.show({
													messageColor: "white",
													backgroundColor: "Red",
													titleColor: "white",
													timeout: 3000,
													position: "center",
													message: "Super Admin Cannot be Deleted ",
												});
                        return;
                      }
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
