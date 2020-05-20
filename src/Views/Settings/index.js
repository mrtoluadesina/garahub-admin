import React from 'react';
import {useSelector} from "react-redux";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

export default props => {
 const {
		customer: {error},
   LoginReducer: {
			user:{firstName,lastName,DOB,phone}
		},
 } = useSelector((state) => state);

  const formatDate = DOB.slice(0,10);

  return (
		<div className="add-product-section">
			<div className="container">
				<h2>Settings</h2>

				<form className="form">
					<div className="row">
						<div className="col _big">
							<Card>
								<h3>Update Profile</h3>
								<div className="form-group">
									{error ? (
										<p>User Not found Proceed to create manually</p>
									) : null}
								</div>
								<div className="form-group">
									<label>First Name </label>
									<Input
										type="text"
										name="firstName"
										placeholder="First Name"
										value={firstName}
									/>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<Input
										type="text"
										name="lastName"
										placeholder="LastName"
										value={lastName}
									/>
								</div>
								<div className="form-group">
									<label>Date of Birth </label>
									<Input type="date" name="dob" value={formatDate} />
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<Input
										type="text"
										name="phone"
										placeholder="Phone Number"
										value={phone}
									/>
								</div>
								<div className="form-group">
									<label>Password </label>
									<Input
										type="password"
										name="password"
                    placeholder="Password"
                    value="password"
									/>
								</div>
							</Card>
						</div>
					</div>
					<div className="row">
						<Button className="btn redSolidBtn" value="Save" />
					</div>
				</form>
			</div>
		</div>
	);
}
