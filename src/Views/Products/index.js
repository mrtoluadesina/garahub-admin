import React, { useEffect } from "react";
import Icon from "@mdi/react";

import axios from 'axios';

import Card from "../../Components/Card";
import Table from "../../Components/Table";
import ProductTab from "../../Components/AbandonedTab";

import {formattedDate} from "../../utils/helperFunc";

import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productAction";
import { Link } from "react-router-dom";

export default props => {
  const {
    products: {products }
  } = useSelector(state => state);
  const dispatch = useDispatch();

  products.filter(item => console.log(item.isDeleted === false));

  const storage = localStorage.getItem("persist:garahub");
  const data = JSON.parse(storage);
  const user = JSON.parse(data.LoginReducer);

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])  

  const auth = {
    headers: {
      Authorization: `Bearer ${user.info.token}`
    }
  }

  const handleEdit = id => {console.log(id)}

  const handleDelete = async id => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/product/${id}`, auth);
    window.location.reload();
  }
  
  return (
    <div className="product-row">
      <div className="container">
        <div className="product-header">
          <h4 className="product">Products</h4>
          <div className="productbtn">
            {/* <OrderButton value="Export" /> */}
          </div>
        </div>
        {/* <ul className="product-ul">
          <li className="export">Export</li>
          <li className="export">Import</li>
          <li>
            <Dropdown>
              <option>More Actions</option>
              <option>Open</option>
            </Dropdown>
          </li>
        </ul> */}
        <Card className="product-card">
          <div className="all-product">
            <ProductTab />
          </div>
          {/* <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <Input placeholder="Search products"
              className="product-filterbar" />
          </div> */}
          <Table>
              <thead className="th-color">
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="product-chevron">
                    Product
                  </th>
                  <th scope="col">Inventory</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Date</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.filter(list => list.isDeleted === false).map((item, index) => (
                  <tr key={index}>
                    <td className="md-5">
                      <div className="product-image">
                        {item.images?<img src={item.images[0]} alt="product" />:<Icon path={item.images[0]} className="product-icon"></Icon>}
                        
                      </div>
                    </td>
                    <td className="order-item"><Link to={`/dashboard/products/edit/${item._id}`}>{item.name}</Link>  </td>
                    <td>
                      <span className="color-orange">{item.quantity} </span>
                      </td>
                    <td className="color-dgray">{item.brandName}</td>
                    <td className="color-dgray date-md">{formattedDate(item.createdAt)}</td>
                    <td className="crud edit" onClick={() => handleEdit(item._id)}>edit</td>
                    <td className="crud del" onClick={() => handleDelete(item._id)}>delete</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Card>
      </div>
    </div>
  );
};
