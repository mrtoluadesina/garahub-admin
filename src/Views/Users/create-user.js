import React, { useState } from "react";
// import {useDispatch,useSelector } from "react-redux";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { createUser } from "../../actions/userAction"
import izitoast from "izitoast";
import Select from "react-select";
import { BeatLoader } from "react-spinners";

export default (props) => {

  // const {
  //   user: {userSuccess }
	// } = useSelector((state) => state);
	
	const [btnLoading, setBtnLoading] = useState(false)


  const [profile, updateProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    DOB: "",
    password: "",
    role:3
  });

  // const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    updateProfile({ ...profile, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
		setBtnLoading(true)
		const docs = document.activeElement;
    docs.setAttribute("disabled", "true");
    createUser(profile).then(()=>{
			izitoast.show({
        messageColor: "white",
        backgroundColor: "green",
        titleColor: "white",
        timeout: 5000,
        position: "bottomRight",
        message: "User Created Successfully "
      });

      updateProfile(()=>({ ...profile, firstName: "", lastName: "", email: "", phone: "", DOB: "", password: "" }));
		}).catch((err)=>{
      izitoast.show({
        messageColor: "white",
        backgroundColor: "red",
        titleColor: "white",
        timeout: 5000,
        position: "bottomRight",
        message: `${err.response? err.response.data.message: err.message}`
      });

		}).finally(()=>{
			docs.removeAttribute('disabled')
			setBtnLoading(false)
		})

    // if (userSuccess === true) {
    //   izitoast.show({
    //     messageColor: "white",
    //     backgroundColor: "green",
    //     titleColor: "white",
    //     timeout: 5000,
    //     position: "bottomRight",
    //     message: "User Created Successfully "
    //   });

    //   updateProfile({ ...profile, firstName: "", lastName: "", email: "", phone: "", DOB: "", password: "" });
    // } else {
    //   izitoast.show({
    //     messageColor: "white",
    //     backgroundColor: "red",
    //     titleColor: "white",
    //     timeout: 5000,
    //     position: "bottomRight",
    //     message: "User Created Successfully "
    //   });
		// }
  }

  const roles =[{ value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'customerCare', label: 'Customer Care' }]

 const handleSelectChange = (value) => {
		if (value.value==="admin") {
      updateProfile({ ...profile, role: 1 })
      return;
   }
		if (value.value==="editor") {
      updateProfile({ ...profile, role: 2 })
      return;
   }
		if (value.value==="customerCare") {
      updateProfile({ ...profile, role: 3 })
      return;
   }
 };
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
                  <label>Roles</label>
                  <Select
									options={roles}
									onChange={handleSelectChange}
									name="role"
									required
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
							</Card>
						</div>
					</div>
					<div className="row">
						<Button className="btn redSolidBtn" value={btnLoading? <BeatLoader color="#fff" size={5} />:"Create User"} />
					</div>
				</form>
			</div>
		</div>
	);
};
