import React from "react";
import "./index.scss";

import Card from "../../Components/Card";
import Icon from "@mdi/react";
import {
  mdiStorefront,
  mdiBriefcaseDownloadOutline,
  mdiCreditCardSettingsOutline
} from "@mdi/js";
import Button from "../../Components/Button";

export default function Dashboard(props) {
  return (
    <div className="row">
      <div className="dashboard">
        <div className="content">
          <span className="intro">
            Here’s what’s happening with your store today.
          </span>
          <div className="summary-caption">
            <Icon className="icon" path={mdiStorefront} />
            <div className="caption">
              <h2>No store activity</h2>
              <p>Your sales, orders, and sessions will show here.</p>
            </div>
          </div>
          <Card className="main-card">
            <div className="card-item">
              <Icon className="icon" path={mdiBriefcaseDownloadOutline} />
              <p>
                <span>4 orders</span> to fulfil
              </p>
            </div>
            <div className="card-item">
              <Icon className="icon" path={mdiCreditCardSettingsOutline} />
              <p>
                <span>1 payment</span> to capture
              </p>
            </div>
          </Card>
          <Card className="information">
            <div className="iContent">
              <img src="/assets/images/cart-info.png" alt="cart" />
              <h4>Turn abandoned checkouts into sales</h4>
              <p>
                Abandoned checkouts happen when a customer creates a cart and
                adds their information but doesn’t complete their purchase.
                Automatically send emails to these customers and improve
                conversion rates.
              </p>
              <div className="btn-group">
                <Button className="btnOutline" value="Schedule emails" />
                <Button className="blueLineBtn" value="Learn More" />
              </div>
            </div>
          </Card>
          <Card className="information">
            <div className="iContent">
              <img src="/assets/images/cart-info.png" alt="cart" />
              <h4>Turn abandoned checkouts into sales</h4>
              <p>
                Abandoned checkouts happen when a customer creates a cart and
                adds their information but doesn’t complete their purchase.
                Automatically send emails to these customers and improve
                conversion rates.
              </p>
              <div className="btn-group">
                <Button className="btnOutline" value="Schedule emails" />
                <Button className="blueLineBtn" value="Learn More" />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="notification-sidebar">
        <Card>
          <div className="notification-filter">
            <select>
              <option>All Channels</option>
              <option>Channel 1</option>
              <option>Channel 2</option>
            </select>
            <select>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>Next Week</option>
            </select>
          </div>
        </Card>
        <Card className="notification-item">
          <span className="item-date">Today</span>
          <h2>TOTAL SALES</h2>
          <p>There were no sales during this time.</p>
        </Card>
        <Card className="notification-item">
          <span className="item-date">Today</span>
          <h2>TOTAL SALES</h2>
          <p>There were no sales during this time.</p>
        </Card>
        <Card className="notification-item">
          <span className="item-date">Today</span>
          <h2>TOTAL SALES</h2>
          <p>There were no sales during this time.</p>
        </Card>
      </div>
    </div>
  );
}
