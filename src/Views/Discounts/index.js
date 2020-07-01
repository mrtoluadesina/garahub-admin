import React, { useEffect, useState} from "react";
import { useModal } from "react-modal-hook";
import { Button,Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import Input from "../../Components/Input";
import izitoast from "izitoast";
import TextArea from "../../Components/TextArea";

import Dropdown from "../../Components/DiscountDropdown/index";
import Table from "../../Components/Table";
import Card from "../../Components/Card";
import {Link} from "react-router-dom"
import {formattedDate} from "../../utils/helperFunc";

import "./styles.scss";

import { fetchDiscounts, deleteDiscount } from "../../actions/discountAction";
import {useDispatch, useSelector } from "react-redux";
import { updateDiscount } from '../../actions/discountAction'

let discountId;


//Edit Form on Modal
const EditForm = ({discounts, ...props}) => {
	const dispatch = useDispatch();

const {
	discounts: { discountSuccess }
} = useSelector((state)=> state);

  let initialState = {
    disCode: discounts.code,
    discount: discounts.discountValue,
    unit: discounts.discountUnit,
    from: discounts.validFrom.split('T')[0],
    till: discounts.validUntil.split('T')[0],
    minOrder: discounts.minimumOrderValue,
    maxDis: discounts.maximumDiscount,
    desc: discounts.description
  };

  let today = new Date(),
    day = today.getDate(),
    month = today.getMonth() + 1, //January is 0
    year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  today = year + "-" + month + "-" + day;

  const [formFields, setField] = useState(initialState);
  useEffect(() => {}, [formFields]);

  const handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "unit" && value === "NAIRA") {
      setField(() => ({ ...formFields, [name]: value, maxDis: 0 }));
    } else {
      setField(() => ({ ...formFields, [name]: value }));
    }
  };


  //Edit User on Submit
  const handleDiscountUser = async (e) => {
    e.preventDefault();
		// dispatch(editUser(adminUser, userId));

      izitoast.show({
				messageColor: "white",
				backgroundColor: "green",
				titleColor: "white",
				timeout: 5000,
				position: "center",
				message: "User Edited Successfully ",
      });
	};



  //Handle Input Select

  const generate = async(e) => {
    e.preventDefault();
    const body = {
      discountValue:formFields.discount,
      discountUnit: formFields.unit,
      validFrom: formFields.from,
      validUntil: formFields.till,
      code: formFields.disCode,
      maximumDiscount: formFields.maxDis
    };
    if (body.discountUnit === "PERCENTAGE") {
      body.maximumDiscount = formFields.maxDis;
		}
		dispatch(updateDiscount(discountId, body))

     if (discountSuccess === true) {
      setField(initialState);
       izitoast.show({
         message: "Coupon Successfully Created",
       messageColor: "white",
        backgroundColor: "Green",
         timeout: 5000,
     });
    }else {
      izitoast.show({
         message: "Unable to Create Coupon",
       messageColor: "white",
        backgroundColor: "Red",
         timeout: 5000,
     });
    }

  };


  return (
		<form className="form" onSubmit={handleDiscountUser}>
			<Card className="modalContainer">
				<div className="form-group formContainer">
				 <label htmlFor="discount-code">
                Discount Code: 
					</label>
					<Input
            name="disCode"
          	value={formFields.disCode}
						id="discount-code"
						type="text"
						className=""
						onChange={handleChange}
						required
					/>
								<span id="msg">Coupon Code Available</span>{" "}
          <span id="msgna">Not Available</span>
				</div>
				<div className="input">
					<label htmlFor="disc">Discount: </label>
					<Input
						id="disc"
						name="discount"
						type="number"
						value={formFields.discount}
						onChange={handleChange}
						placeholder="Discount"
						className=""
						required
						style={{ marginRight: "2rem" }}
					/>
					<Dropdown name={"unit"} onChange={handleChange} required>
						<option value="NAIRA">Naira</option>
						<option value="PERCENTAGE">Percent (%)</option>
					</Dropdown>
				</div>

				<div className="input layer-input">
					<label htmlFor="from">Valid From:</label>
					<Input
						id="from"
						name="from"
						value={formFields.from}
						type="date"
						min={today}
						pattern="\d{4}-\d{2}-\d{2}"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="input layer-input">
					<label htmlFor="till">Valid Till:</label>
					<Input
						id="till"
						name="till"
						min={today}
						value={formFields.till}
						type="date"
						pattern="\d{4}-\d{2}-\d{2}"
						onChange={handleChange}
						className=""
						required
					/>
				</div>

				<div className="input layer-input">
					<label htmlFor="minorder">Minimum Order:</label>
					<Input
						id="minorder"
						name="minOrder"
						type="number"
						value={formFields.minOrder}
						onChange={handleChange}
						className=""
						required
					/>
				</div>

				{formFields.unit === "PERCENTAGE" && (
					<div className="input layer-input">
						<label htmlFor="maxdiscount">Maximum Discount:</label>
						<Input
							id="maxdiscount"
							name="maxDis"
							value={formFields.maxDis}
							type="number"
							min="0"
							max="100"
							className=""
							onChange={handleChange}
							required
						/>
					</div>
				)}

				<div className="input layer-input">
					<label htmlFor="desc">Description:</label>
					<TextArea
						id="desc"
						name="desc"
						value={formFields.desc}
						onChange={handleChange}
						className=""
						required
					/>
				</div>

        <span
          id="button-warning"
          style={{ float: "left", marginLeft: "1rem" }}
        ></span>
        <div
          className="customerbtn submit"

          id="button-div"

          disabled={true}
        >
          <button
          style={{background:"#00315E",
          height:50,
          width:150,
          color:"white",
          borderRadius:5

        }}
          onClick={generate} id="button" >Generate</button>
        </div>
			</Card>

      <div className="row editButton">
        {/* <CustomButton className="btn redSolidBtn" value="Edit User" /> */}
			</div>
		</form>
	);
}

export default (props) => {
	
	const discountDetails = JSON.parse(localStorage.getItem("couponsData"));
// edit discount
	const [showEditModal, hideEditModal] = useModal(({ in: open, onExited }) => (
		<Dialog open={open} onExited={onExited} onClose={hideEditModal}>
			<DialogTitle>Edit User</DialogTitle>
			<DialogContent>
				 <EditForm discounts={discountDetails.find(discount => discount._id === discountId)}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={hideEditModal}>Close</Button>
			</DialogActions>
		</Dialog>
 ));

// delete discount
const [showDeleteModal, hideModal] = useModal(({ in: open, onExited }) => (
	<Dialog open={open} onExited={onExited} onClose={hideModal}>
		<DialogTitle>Delete Discount</DialogTitle>
		<DialogContent>
			Are you Sure you want to delete Discount?
		</DialogContent>
		<DialogActions>
			<Button onClick={hideModal}>Close</Button>
			<Button onClick={() => {
				dispatch(deleteDiscount(discountId));
				hideModal();
			}

			}>yes</Button>

		</DialogActions>
	</Dialog>
));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);
  return (
		<div className="order-row">
			<div className="container">
				<div className="order-header">
					<h4 className="order">Discounts</h4>
				 <div className="orderBtn">
            <Link to="/dashboard/discounts/add"
              className="redSolidBtn"
              style={{height:100,width:50,padding:10,borderRadius:3}}
            >
              Create Discount
            </Link>
          </div>
				</div>
				<Card className="order-card">
					<div>
						<Table>
							<thead className="th-color">
								<tr>
									<th scope="col">S/N</th>
									<th scope="col">Discount Code</th>
									<th scope="col">Discount</th>
									<th scope="col">Discount Unit</th>
                  <th scope="col">Valid From</th>
									<th scope="col">Valid Until</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{discountDetails.length > 0 ? (
									discountDetails.filter(item => !item.isDeleted).map((item, index) => (
										<tr key={index}>
											<td className="color-lgray">{index + 1}</td>
											<td className="order-item" title="Click to view more">{item.code}</td>
											<td className="color-dgray">{item.discountValue}</td>
											<td className="color-lgray">{item.discountUnit}</td>
                      <td className="color-dgray">{formattedDate(item.validFrom)}</td>
											<td className="color-dgray">{formattedDate(item.validUntil)}</td>
											<td>
												<button onClick={() => {
                      discountId = item._id;
                      showEditModal();
                    }}>Edit</button>
												<button onClick={()=>{
													discountId = item._id
													showDeleteModal()
												}}>Delete</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<p>No Discounts Yet</p>
									</tr>
								)}
							</tbody>
						</Table>
					</div>
				</Card>
			</div>
		</div>
	);
};
