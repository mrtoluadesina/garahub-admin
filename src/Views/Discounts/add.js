import React, { useState, useEffect } from "react";

import OrderButton from "../../Components/GenerateButton/index";
import Dropdown from "../../Components/DiscountDropdown/index";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Form from "../../Components/Form";
import { connect } from "react-redux";
import iziToast from "izitoast";

import { checkCode, postCoupon } from "../../utils/axiosFunctions";

import "./styles.scss";

const Discount = ({ data, ...props }) => {
  let initialState = {
    disCode: "",
    discount: 0,
    unit: "NAIRA",
    from: "",
    till: "",
    minOrder: 0,
    maxDis: 0,
    desc: ""
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

  const retrieveCode = async e => {
    const target = e.target.value;
    const url = "http://localhost:3005/api/v1/coupon/" + target;
    const auth = "Bearer " + data;
    const check = await checkCode(url, auth);
    const msg = document.querySelector("#msg");
    const msgna = document.querySelector("#msgna");

    if (check >= 400) {
      msgna.style.display = "none";
      msg.style.display = "inline-block";
    } else if (target.length !== 0 && target !== "hello") {
      msg.style.display = "none";
      msgna.style.display = "inline-block";
    } else {
      msg.style.display = "none";
      msgna.style.display = "none";
    }
  };

  const generate = async e => {
    e.preventDefault();
    const body = {
      discountUnit: formFields.unit,
      validFrom: formFields.from,
      validUntil: formFields.till,
      code: formFields.disCode,
      maximumDiscount: formFields.maxDis
    };
    if (body.discountUnit === "PERCENTAGE")
      body.maximumDiscount = formFields.maxDis;
    const resp = await postCoupon(body);

    if (resp === 1) {
      setField(initialState);
      document.location.reload();
      let id = "toast";
      let fu = '[id="' + id.toString() + '"]';
      iziToast.show({
        message: "Coupon Successfully Created",
        messageColor: "white",
        backgroundColor: "black",
        zindex: 20,
        timeout: 3000,
        closeOnEscape: true,
        closeOnClick: true,
        position: "topRight",
        transitionIn: "fadeInUp",
        transitionOut: "fadeOut",
        transitionInMobile: "fadeInUp",
        transitionOutMobile: "fadeOutDown",
        target: fu
      });
    }
  };

  const warning = () => {
    let id = "button-warning";
    let fu = '[id="' + id.toString() + '"]';
    iziToast.show({
      message: "Please make sure all fields are filled",
      messageColor: "black",
      zindex: 20,
      timeout: 1000,
      closeOnEscape: true,
      closeOnClick: true,
      position: "topRight",
      transitionIn: "fadeInUp",
      transitionOut: "fadeOut",
      transitionInMobile: "fadeInUp",
      transitionOutMobile: "fadeOutDown",
      target: fu
    });
  };

  function formFilled() {
    const {
      disCode: a,
      discount: b,
      unit: c,
      from: d,
      till: e,
      minOrder: f,
      maxDis: g,
      desc: h
    } = formFields;

    let result =
      a &&
      b &&
      c &&
      d &&
      e &&
      (f === 0 || f) &&
      ((c === "PERCENTAGE" && (g === 0 || g)) || c === "NAIRA") &&
      h;

    return result;
  }

  return (
    <div className="customer-row">
      <div className="container">
        <div className="customer-header">
          <h4 className="customer">Create Discounts</h4>
          <span id="toast"></span>
        </div>

        <Card className="customer-card">
          <Form>
            <div className="input layer-input">
              <label htmlFor="discount-code">
                Discount Code: <span id="msg">Coupon Code Available</span>{" "}
                <span id="msgna">Not Available</span>
              </label>
              <Input
                name="disCode"
                value={formFields.disCode}
                id="discount-code"
                type="text"
                className=""
                onBlur={retrieveCode}
                onChange={handleChange}
                required
              />
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
                <option selected disabled>
                  Select Unit
                </option>
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
          </Form>
        </Card>

        <span
          id="button-warning"
          style={{ float: "left", marginLeft: "1rem" }}
        ></span>
        <div
          className="customerbtn submit"
          id="button-div"
          onClick={!formFilled() ? warning : generate}
          disabled={true}
        >
          <OrderButton id="button" value="Generate" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ LoginReducer }) => ({
  data: LoginReducer?.info.token
});

export default connect(mapStateToProps)(Discount);
