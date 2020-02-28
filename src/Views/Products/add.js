import React from "react";
import Card from "../../Components/Card";

import './styles.scss';
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";

export default props => {
  return (
    <div className="add-product-section">
      <div className="container">
        <h2>Add products</h2>
        <div className="row">
          <div className="col _big">
            <form className="form">
              <Card>
                <div className="form-group">
                  <label>Title</label>
                  <Input type="text" placeholder="Product Name" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <TextArea placeholder="Describe your product" />
                </div>
              </Card>
            </form>
          </div>
          <div className="col _small">
            <Card>

            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
