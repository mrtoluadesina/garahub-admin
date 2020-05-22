import React, { useEffect, useState } from "react";

import OrderButton from "../../Components/OrderButton/index";
import Table from "../../Components/Table";
import Card from "../../Components/Card";

import {formattedDate} from "../../utils/helperFunc";

import "./styles.scss";

import { fetchDiscount } from "../../actions/discountAction";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {

  // const {
  //   discounts: { discounts },
  // } = useSelector((state) => state);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchDiscounts());
  // }, []);
  const [discountPage, setDiscountPage] = useState({
    order: [],
    page: 1
  })
  const [discounts, setDiscounts] =  useState([])
  const [query, setQuery] = useState({
    limit: 100, skip: 1
  }) 
  const [page, setPage] = useState({
    lower: 0,
    upper: 0
  })
  const [limit, setLimit] = useState(20)

  const [tot, setTotal] = useState(0)

  const [nextData, setNextData] = useState(false)

  useEffect(() => {
    if (nextData) {
      fetchDiscount(`limit=${query.limit}&skip=${query.skip}`)
      .then((payload)=> {
        // set order to state
        let newOrder = [ ...discounts, ...payload.data ];
        setDiscounts(()=> newOrder);
        setTotal(payload.total);
        let upper = page.upper;
        let lower =  page.lower
        setPage(() => ({
          upper: ++upper, lower: ++lower
        }));
    })
    }
  }, [query.skip]);
  
  useEffect(() => {
    let upper = page.upper;
    let lower =  page.lower
    let order = discounts.filter((trans, index) => {
      return(index >= lower*limit && index < upper*limit) 
    })
    setDiscountPage(()=>({
      ...discountPage, order: order
    }))
  }, [page.upper])


  useEffect(() => {
    fetchDiscount(`limit=${query.limit}&skip=${query.skip}`)
    .then((payload)=> {
      // set discount to state
        let newOrder = [ ...discounts, ...payload.data ];
        setDiscounts(()=> newOrder);
        setTotal(payload.total);
        let upper = page.upper;
      setPage(() => ({
       ...page, upper: ++upper
      }));
  
    })
  }, []);

  const next = () => {
    if ( page.upper*limit >= discounts.length - 1) {
      // make call to fetch the next set
      if (query.skip * limit < tot) {
        setNextData(true)
        setQuery(()=> ({
          ...query, skip: query.skip + 1
        }))
      }
    } else {
      let upper = page.upper;
      let lower =  page.lower
      setPage(() => ({
        upper: ++upper, lower: ++lower
      }));
    }
    setDiscountPage(()=>({
      ...discountPage, page: discountPage.page +1
    }))
    
  }

  const prev = () => {
    let upper = page.upper;
    let lower =  page.lower
    setPage(() => ({
      upper: --upper, lower: --lower
    }));
    setDiscountPage(()=>({
      ...discountPage, page: discountPage.page - 1
    }))

  }

  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Discounts</h4>
          <div className="orderBtn">
            {/* <OrderButton value="Create Discount" /> */}
          </div>
        </div>
        <Card className="order-card">
          <div>
            <Table>
              <thead className="th-color">
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Transaction Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Discount Name</th>
                  <th scope="col">Discount Type</th>
                  <th scope="col">Discount</th>
                </tr>
              </thead>
              <tbody>
                {discounts.length > 0 ? (
                  discounts.map((item, index) => (
                    <tr key={index}>
                      <td className="color-lgray">{index + 1}</td>
                      <td className="order-item">{item._id}</td>
                      <td className="color-lgray">{formattedDate(item.createdAt)}</td>
                      <td className="color-dgray">{item.name}</td>
                      <td className="color-lgray">{item.type}</td>
                      <td className="color-dgray">{item.discount}</td>
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
