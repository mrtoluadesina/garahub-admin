import React from "react";

import Card from "../../Components/Card";
import Table from "../../Components/Table";

import "./styles.scss";

import { useSelector} from "react-redux";

export default props => {
  const {customer: {customers,loading}} = useSelector(state => state);


  const loadingtext = (
    <>
    {loading ===true && <p>loading...</p>}
    </>
  )

    return (
    <div className="customer-row">
      <div className="container">
        <div className="customer-header">
          <h4 className="customer">Customers</h4>
        </div>
        <Card className="customer-card">
          <div className="all-customer">
            <span>Showing {customers.length} customers</span>
            </div>
            {loadingtext}
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
