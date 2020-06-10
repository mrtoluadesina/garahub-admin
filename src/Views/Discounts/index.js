import React, { useEffect} from "react";

import OrderButton from "../../Components/OrderButton/index";
import Table from "../../Components/Table";
import Card from "../../Components/Card";
import {Link} from "react-router-dom"
import {formattedDate} from "../../utils/helperFunc";

import "./styles.scss";

import { fetchDiscounts } from "../../actions/discountAction";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {

  const {
    discounts: { discounts,discountSuccess },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscounts());
    console.log(discounts.payload);
    console.log(discountSuccess);
  }, []);
  // const [discountPage, setDiscountPage] = useState({
  //   order: [],
  //   page: 1
  // })
  // //const [discounts, setDiscounts] =  useState([])
  // const [query, setQuery] = useState({
  //   limit: 100, skip: 1
  // })
  // const [page, setPage] = useState({
  //   lower: 0,
  //   upper: 0
  // })
  // const [limit, setLimit] = useState(20)

  // const [tot, setTotal] = useState(0)

  // const [nextData, setNextData] = useState(false)

  // useEffect(() => {
  //   if (nextData) {
  //     fetchDiscount(`limit=${query.limit}&skip=${query.skip}`)
  //     .then((payload)=> {
  //       // set order to state
  //       let newOrder = [ ...discounts, ...payload.data ];
  //       setDiscounts(()=> newOrder);
  //       setTotal(payload.total);
  //       let upper = page.upper;
  //       let lower =  page.lower
  //       setPage(() => ({
  //         upper: ++upper, lower: ++lower
  //       }));
  //   })
  //   }
  // }, [query.skip]);

  // useEffect(() => {
  //   let upper = page.upper;
  //   let lower =  page.lower
  //   let order = discounts.filter((trans, index) => {
  //     return(index >= lower*limit && index < upper*limit)
  //   })
  //   setDiscountPage(()=>({
  //     ...discountPage, order: order
  //   }))
  // }, [page.upper])


  // useEffect(() => {
  //   fetchDiscount(`limit=${query.limit}&skip=${query.skip}`)
  //   .then((payload)=> {
  //     // set discount to state
  //       let newOrder = [ ...discounts, ...payload.data ];
  //       setDiscounts(()=> newOrder);
  //       setTotal(payload.total);
  //       let upper = page.upper;
  //     setPage(() => ({
  //      ...page, upper: ++upper
  //     }));

  //   })
  // }, []);

  // const next = () => {
  //   if ( page.upper*limit >= discounts.length - 1) {
  //     // make call to fetch the next set
  //     if (query.skip * limit < tot) {
  //       setNextData(true)
  //       setQuery(()=> ({
  //         ...query, skip: query.skip + 1
  //       }))
  //     }
  //   } else {
  //     let upper = page.upper;
  //     let lower =  page.lower
  //     setPage(() => ({
  //       upper: ++upper, lower: ++lower
  //     }));
  //   }
  //   setDiscountPage(()=>({
  //     ...discountPage, page: discountPage.page +1
  //   }))

  // }

  // const prev = () => {
  //   let upper = page.upper;
  //   let lower =  page.lower
  //   setPage(() => ({
  //     upper: --upper, lower: --lower
  //   }));
  //   setDiscountPage(()=>({
  //     ...discountPage, page: discountPage.page - 1
  //   }))

  // }

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
