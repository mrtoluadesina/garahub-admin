import React from "react";
import "./styles.scss";
import Card from "../Card";
import { Line } from "react-chartjs-2";

export default props => {
  return (
    <Card>
      <div className="data-card-header">
        <h3 className="title">Total Sales</h3>
        <a href="/" className="data-card-link">
          View report
        </a>
      </div>
      <div className="data-card-body">
        {props.data ? (
          <>
            <div className="data-card-value">
              <span className="value">$0.00</span>
              <span>-</span>
            </div>
            <div className="data-card-content">
              {props.children}
              <h4>{props.data.title}</h4>
              <Line data={props.data.data} />
            </div>
          </>
        ) : (
          <h3>There were no sales in this date range.</h3>
        )}
      </div>
    </Card>
  );
};
