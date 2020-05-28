import React, { useState } from "react";
import {useDispatch,useSelector } from "react-redux";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { createUser } from "../../actions/userAction"
import izitoast from "izitoast";


export default (props) => {
	//const formatDate = DOB.slice(0, 10);
const {
	user: {userError, userSuccess }
  } = useSelector((state) => state);

const [createUserSuccess, setCreateUserSuccess] = useState(false);
  const [error, setError] = useState(false);

	const [profile, updateProfile] = useState({
		firstName:"",
    lastName: "",
    email:"",
		phone: "",
		DOB: "",
		password: "",
  });
  //const [confirmPassword,setConfirmPassword]=useState("");
  const dispatch = useDispatch();
	const handleChange = ({ target }) => {
    updateProfile({ ...profile, [target.name]: target.value });
   // setConfirmPassword(target.value);
	};
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUser(profile));
    setError(userError);
    setCreateUserSuccess(userSuccess);
    if (createUserSuccess === false) {
izitoast.show({
          messageColor: "white",
          backgroundColor: "red",
          titleColor: "white",
          timeout: 5000,
          message: error
        });
    }
     if (createUserSuccess === true) {
izitoast.show({
          messageColor: "white",
          backgroundColor: "green",
          titleColor: "white",
          timeout: 5000,
          position:"center",
          message: "User Created Successfully "
        });

     updateProfile({...profile,firstName:"",lastName:"",email:"",phone:"",DOB:"",password:""});
    }
  }
	return (
		<div className="add-product-section">
			<div className="container">
				<h2>Create User </h2>

				<form className="form" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col _big">
							<Card>
								<h3>Create User</h3>
								<div className="form-group">
									<label>First Name </label>
									<Input
										type="text"
										name="firstName"
                    placeholder="First Name"
                    value={profile.firstName}
									onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<Input
										type="text"
										name="lastName"
										placeholder="LastName"
                    value={profile.lastName}
									onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<Input
										type="email"
										name="email"
                    placeholder="Email"
                    value={profile.email}
									onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Date of Birth </label>
									<Input
										type="date"
                    name="DOB"
                    value={profile.DOB}
									onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<Input
										type="text"
										name="phone"
                    placeholder="Phone Number"
                    value={profile.phone}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Role</label>
									<Input
										type="text"
										name="role"
										placeholder="Role"
									/>
								</div>
								<div className="form-group">
									<label>Password </label>
									<Input
										type="password"
										name="password"
										placeholder="Password"
                    value={profile.password}
										onChange={handleChange}
									/>
								</div>
								{/* <div className="form-group">
									<label>Confirm Password </label>
									<Input
										type="password"
										name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
										onChange={handleChange}
									/>
								</div> */}
							</Card>
						</div>
					</div>
					<div className="row">
						<Button className="btn redSolidBtn" value="Create User"  />
					</div>
				</form>
			</div>
		</div>
	);
};
