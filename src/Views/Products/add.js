import React from "react";
import Card from "../../Components/Card";

import "./styles.scss";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from '../../Components/Button';

export default props => {
  return (
    <div className="add-product-section">
      <div className="container">
        <h2>Add products</h2>
        <form className="form">
          <div className="row">
            <div className="col _big">
              <Card>
                <div className="form-group">
                  <h3>Title</h3>
                  <Input type="text" placeholder="Product Name" />
                </div>
                <div className="form-group">
                  <h3>Description</h3>
                  <TextArea placeholder="Describe your product" />
                </div>
              </Card>
              <Card>
                <div className="form-group">
                  <h3>Images</h3>
                  <Input type="file" />
                </div>
              </Card>
              <Card>
                <h3>Pricing</h3>
                <div className="row">
                  <div className="form-group">
                    <label>Price</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="form-group">
                    <label>Sales Price</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
              </Card>
              <Card>
                <h3>Inventory</h3>
                <div className="form-group">
                  <label>Stock</label>
                  <Input type="number" placeholder="0" />
                </div>
              </Card>
            </div>
            <div className="col _small">
              <Card>
                <h4>Categories</h4>
                <div className="form-group">
                  <label>select category</label>
                  <Input type="text" placeholder="Enter Category" />
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
};
