import React, {useEffect} from "react";

import Card from "../../Components/Card";
import Table from "../../Components/Table";

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
            {/* <OrderButton value="Add customer" /> */}
          </div>
        </div>
        <Card className="customer-card">
          <div className="all-customer">
            <span>Showing {customers.length} customers</span>
          </div>
          <Table>
              <thead className="th-color">
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="color-dgray customer-padding">{item.firstName} {item.lastName}</span>
                    </td>
                    <td>

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
