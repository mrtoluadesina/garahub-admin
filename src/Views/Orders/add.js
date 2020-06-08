import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import Card from "../../Components/Card";
import izitoast from "izitoast";
import "./styles.scss";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { fetchACustomer } from "../../actions/customerActions";
import { createOrders } from "../../actions/orderAction";
import { getActualPrice } from "../../utils/helperFunc";
import { BeatLoader } from "react-spinners";

export default (props) => {
  const {
    products: { products },
    customer: { customer, error, loading },
    orders: { orderError, orderSuccess },
  } = useSelector((state) => state);
  const [uploadSuccess, setSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const dispatch = useDispatch();

  const [order, createOrder] = useState({
    cartItems: [],
    address: {},
    email: "",
    phone: "",
    userId: "",
    firstName: "",
    lastName: "",
  });
  const [productList] = useState(
    products.map((state) => {
      return {
        productId: state._id,
        quantities: state.quantity,
        price: state.price,
        value: state._id,
        label: state.name,
      };
    })
  );
  let costOfGoods = 0;
  let [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    if (customer) {
      createOrder({
        ...order,
        phone: customer.phone,
        userId: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
      });
    }
    if (error.length > 1) {
      createOrder({
        ...order,
        phone: "",
        userId: "",
        firstName: "",
        lastName: "",
      });
    }
  }, [customer, error, order.cartItems, createOrder, costOfGoods, totalCost]);

  const handleSelectChange = (product) => {
    if (product) {
      createOrder({ ...order, cartItems: [...product] });
      return;
    }
    createOrder({ ...order, cartItems: [] });
  };

  const handleChange = ({ target }) => {
    createOrder({ ...order, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productIds = order.cartItems.map((elements) => {
      return {
        quantity: elements.quantity,
        productId: elements.productId,
      };
    });

    let postOrder = {
      id: order.userId,
      productIds: [...productIds],
      userDetails: {
        email: order.email,
        firstName: order.firstName,
        lastName: order.lastName,
        address: order.userId
          ? order.address.address1 || "no address1"
          : order.address || "no address",
        phone: order.phone,
      },
      chargedAmount: totalCost,
    };

    dispatch(createOrders(postOrder));
    setSuccess(orderError);
    setUploadError(orderSuccess);
    if (orderSuccess) {
      izitoast.show({
        messageColor: "white",
        title: "Order Created",
        backgroundColor: "#00FF00",
        titleColor: "white",
        timeout: 5000,
        message: `order created Successfully`,
        onClosed: () => setSuccess(false),
      });
    } else if (orderError) {
      izitoast.show({
        messageColor: "white",
        title: "Order Error",
        backgroundColor: "red",
        titleColor: "white",
        timeout: 5000,
        message: error,
        onClosed: () => setUploadError(false),
      });
    }
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    try {
      const email = order.email.toLowerCase();
      dispatch(fetchACustomer(email));
    } catch (err) {}
  };
  const handleCalculation = (e) => {
    e.preventDefault();
    let cost = 0;
    order.cartItems.map((element) => {
      cost += element.cost;
      return;
    });
    setTotalCost(cost);
    return;
  };
  const handleAddrChange = (address) => {
    createOrder({ ...order, address });
  };
  const handleProductNumber = ({ target }) => {
    order.cartItems.map((selected) => {
      if (selected.value === target.name) {
        if (target.value === "" || target.value === "0") {
          selected["quantity"] = 0;
          selected["cost"] = 0;
          selected["productDetailsId"] = selected._id;
          createOrder({ ...order });
        } else {
          let price = getActualPrice(parseInt(target.value), selected.price);
          let cost = price * parseInt(target.value);
          selected["quantity"] = parseInt(target.value);
          selected["cost"] = cost;
          selected["productDetailsId"] = selected._id;
          createOrder({ ...order });
        }
      }
      return;
    });
  };
  return (
		<div className="add-product-section">
			<div className="container">
				<h2>Create Order</h2>
				<form className="form" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col _big">
							<Card>
								<div className="form-group">
									<h3>Product</h3>
									<Select
										options={productList}
										onChange={handleSelectChange}
										name="product"
										value={order.product}
										isMulti
									></Select>
									{order.cartItems ? (
										<div className="lists">
											{order.cartItems.map((product) => (
												<li className="cart-item" key={product.value}>
													<span className="label">{product.label}</span>
													<input
														className="small"
														type="number"
														name={product.value}
														max={product.quantities}
														min="0"
														placeholder="number"
														onChange={handleProductNumber}
													/>
													<span className="small">
														&#8358;{product.cost ? product.cost : 0}
													</span>
												</li>
											))}
											<div className="calculate">
												{
													<button
                            style={{
                              background: "#00315E",
                              color: "white",
                              height: 50,
                              width:100
                            }}
														onClick={handleCalculation}
													>
														calculate
													</button>
												}
												<p>Total Cost:&#8358; {totalCost}</p>
											</div>
										</div>
									) : null}
								</div>
							</Card>
							<Card>
								<h3>Customer Information</h3>

								<div className="form-group">
									<label>Email Address</label>
									<div className="split">
										<Input
											type="text"
											className="__big"
											name="email"
											onChange={handleChange}
											placeholder="Email"
										/>

										<button
											className="redSolidBtn __small"
											type=""
											onClick={handleEmailCheck}
										>
											{(loading && <BeatLoader color="#fff" size={5} />) ||
												"Check"}
										</button>
									</div>
									{error ? (
										<p>User Not found Proceed to create manually</p>
									) : null}
								</div>
								<div className="form-group">
									<label>First Name</label>
									<Input
										type="text"
										name="firstName"
										onChange={handleChange}
										placeholder="First Name"
										value={order.firstName}
									/>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<Input
										type="text"
										name="lastName"
										onChange={handleChange}
										placeholder="Last Name"
										value={order.lastName}
									/>
								</div>
								<div className="form-group">
									<label>Mailing Address</label>
									{customer.address ? (
										<Select
											options={customer.address}
											onChange={handleAddrChange}
											name="address"
											value={order.address}
										></Select>
									) : (
										<Input
											type="text"
											name="address"
											onChange={handleChange}
											placeholder="Mailing Address"
										/>
									)}
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<Input
										type="text"
										name="phone"
										onChange={handleChange}
										placeholder="Phone Number"
										value={order.phone}
									/>
								</div>
							</Card>
						</div>
					</div>
					<div className="row">
						<Button
							className=" redSolidBtn"
							value={
								(loading && <BeatLoader color="#fff" size={5} />) || "Save"
							}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};
