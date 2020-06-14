import React, { useEffect} from "react";
import Table from "../../Components/Table";
import Card from "../../Components/Card";
import {Link} from "react-router-dom"
import {formattedDate} from "../../utils/helperFunc";

import "./styles.scss";

import { fetchDiscounts } from "../../actions/discountAction";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {

  const {
    discounts: { discounts},
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, []);

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
								</tr>
							</thead>
							<tbody>
								{discounts.length > 0 ? (
									discounts.map((item, index) => (
										<tr key={index}>
											<td className="color-lgray">{index + 1}</td>
											<td className="order-item">{item.code}</td>
											<td className="color-dgray">{item.discountValue}</td>
											<td className="color-lgray">{item.discountUnit}</td>
                      <td className="color-dgray">{formattedDate(item.validFrom)}</td>
											<td className="color-dgray">{formattedDate(item.validUntil)}</td>
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
