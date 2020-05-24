import React, { useEffect, useState } from "react";

import Table from "../../Components/Table";
import Card from "../../Components/Card";

import {formattedDate} from "../../utils/helperFunc";

import "./index.scss";

import { fetchTransaction } from "../../actions/transactionAction";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {

  const [trans, setTrans] = useState({
    transacts: [],
    page: 1
  })
  const [transact, setTransaction] =  useState([])
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
      fetchTransaction(`limit=${query.limit}&skip=${query.skip}`)
      .then((payload)=> {
        // set transaction to state
          let newTransact = [ ...transact, ...payload.data ];
          setTransaction(()=> newTransact);
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
    let transacts = transact.filter((trans, index) => {
      return(index >= lower*limit && index < upper*limit) 
    })
    setTrans(()=>({
      ...trans, transacts: transacts
    }))
  }, [page.upper])

  useEffect( () => {
    fetchTransaction(`limit=${query.limit}&skip=${query.skip}`)
      .then((payload)=> {
        // set transaction to state
          let newTransact = [ ...transact, ...payload.data ];
          setTransaction(()=> newTransact);
          setTotal(payload.total);
          let upper = page.upper;
        setPage(() => ({
         ...page, upper: ++upper
        }));
    
      })
  }, []);



  const next = () => {
    if ( page.upper*limit >= transact.length - 1) {
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
    setTrans(()=>({
      ...trans, page: trans.page +1
    }))
    
  }

  const prev = () => {
    let upper = page.upper;
    let lower =  page.lower
    setPage(() => ({
      upper: --upper, lower: --lower
    }));
    setTrans(()=>({
      ...trans, page: trans.page -1
    }))

  }

  return (
    <div className="order-row">
      <div className="container">
        <div className="order-header">
          <h4 className="order">Transactions</h4>
          <div className="orderBtn">
          <button >Refresh</button>
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
                {transact.length > 0 ? (
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
              <span>{trans.page}</span>
              <button className="paginate"  onClick={next} disabled={trans.page * limit >= tot}>{">"}</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
