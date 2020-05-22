import React, { useEffect, useState } from "react";

import Table from "../../Components/Table";
import Card from "../../Components/Card";

import {formattedDate} from "../../utils/helperFunc";

import "./index.scss";

import { fetchTransactions } from "../../actions/transactionAction";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {

  const [trans, setTrans] = useState({
    transacts: [],
    page: 1
  })
  const [transact, setTransaction] =  useState([])
  const [query, setQuery] = useState({
    limit: 40, skip: 1
  }) 
  const [page, setPage] = useState({
    lower: 0,
    upper: 1
  })
  const [limit, setLimit] = useState(20)

  const {
    transactions: { transactions: { data: transactions, total: tot} },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let upper = page.upper;
    let lower =  page.lower
    if (!transact.length) return
    let transacts = transact.filter((trans, index) => {
      return(index >= lower*limit && index < upper*limit) 
    })
    setTrans(()=>({
      ...trans, transacts: transacts
    }))
  }, [page]);


  useEffect(() => {
    dispatch(fetchTransactions(`limit=${query.limit}&skip=${query.skip}`));
    let  transaction = [...transact, ...transactions]
    let upper = page.upper;
    let lower =  page.lower
    let transacts = transaction.filter((trans, index) => {
      return(index >= lower*limit && index < upper*limit) 
    })
    setTrans(()=>({
      ...trans, transacts: transacts
    }))
    setTransaction(() => transaction)

  }, [query]);


  const next = () => {
    if ( page.upper*limit >= transact.length-1) {
      // make call to fetch the next set
      console.log('making call ', query.skip, transact)
      if (query.skip * limit < tot) {
        setQuery(()=> ({
          ...query, skip: query.skip + 1
        }))
      }
      let upper = ++page.upper;
      let lower =  ++page.lower

      setPage(() => ({
        upper: upper, lower: lower
      }));
      setTrans(()=>({
        ...trans, page: trans.page +1
      }))
      
    } else {
      // increase low and upper of page
      let upper = ++page.upper;
      let lower =  ++page.lower
      setPage(() => ({
        upper: upper, lower: lower
      }));
      setTrans(()=>({
        ...trans, page: trans.page +1
      }))
  }
  }
  const prev = () => {
    if (page.lower < 1 ) {
      let upper = page.upper;
      let lower =  page.lower
      setTrans(()=>({
        ...trans, page: trans.page -1
      }))
    } else {
      // decrease low and upper of page
      let upper = --page.upper;
      let lower =  --page.lower

      setPage(() => ({
        upper: upper, lower: lower
      }));
      setTrans(()=>({
        ...trans, page: trans.page -1
      }))
    }
    }
  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Transactions</h4>
          <div className="orderBtn">
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
                  <th scope="col">Transaction Quantity</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  trans.transacts.map((item, index) => (
                    <tr key={index}>
                      <td className="checkbox">{index + 1}</td>
                      <td className="order-item">{item._id}</td>
                      <td className="color-lgray">{formattedDate(item.createdAt)}</td>
                      <td className="color-dgray">{item.items.length}</td>
                      <td className="color-lgray">{`${item.user.firstName} ${item.user.lastName}`}</td>
                      <td className="color-dgray">{item.chargedAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6"><p>No Transactions Yet</p></td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div>
              <button className="paginate" onClick={prev} disabled={trans.page < 2}>{"<"}</button>
              <button className="paginate"  onClick={next} disabled={trans.page*limit >= tot}>{">"}</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
