import React, {useEffect} from "react";

import OrderButton from "../../Components/OrderButton/index";
import Dropdown from "../../Components/Dropdown/index";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Input from "../../Components/Input";
import CustomersTab from "../../Components/CustomerTab";

import "./styles.scss";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllCustomers } from "../../actions/customerActions";

export default props => {
  const {customer: {customers}} = useSelector(state => state);
  console.log(customers)
  const dispatch = useDispatch()

  useEffect(()=>{
    const data = dispatch(fetchAllCustomers())
    console.log(data)
  },[])  

  return (
    <div className="customer-row">
      <div className="container">
        <div className="customer-header">
          <h4 className="customer">Customers</h4>
          <div className="customerbtn">
            <OrderButton value="Add customer" />
          </div>
        </div>
        <ul className="customer-ul">
            <li className="export">Import customers</li>
            <li className="export">Export</li>
            <li>
            <Dropdown>
              <option>More Actions</option>
              <option>Open</option>
            </Dropdown>
          </li>
        </ul>
        <Card className="customer-card">
          <div className="all-customer">
            <CustomersTab />
          </div>
          <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <Input placeholder="Search customers"
              className="customer-filterbar" />
            <p className="sortBy">Sort by</p>
            <div className="update-status">
              <Dropdown>
                <option>Newest update</option>
              </Dropdown>
            </div>
          </div>
          <Table>
              <thead className="th-color">
                <tr>
                  <th className="checkbox" scope="col">
                    <input type="checkbox"></input>
                  </th>
                  <th scope="col">Showing {customers.length} customers</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item, index) => (
                  <tr key={index}>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td>
                      <span className="color-dgray customer-padding">{item.firstName} {item.lastName}</span>
                      <span className="color-lgray"> {item.email}</span>
                    </td>
                    <td className="color-lgray">{item.phone}</td>
                    <td className="color-lgray">{(item.isGuest ? 'guest' : 'member')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Card>
      </div>
    </div>
  );
};
