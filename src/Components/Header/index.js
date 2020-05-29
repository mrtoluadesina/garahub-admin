import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

export default props => {
  return (
    <div className="header">
      <Link className="logo-section" to="/">
        <div className="logo">
          <img src="/assets/images/logo.svg" alt="emall admin" />
        </div>
        <span className="admin"> Admin</span>
      </Link>
      <div className="search">
        {/* <i className="fas fa-search"></i>
        <input
          type="search"
          placeholder="Search"
          className="searchInput"
        ></input> */}
      </div>
      <div className="user">
        <div className="avatar"></div>
        <div className="profile">
          <p className="name">Administrator</p>
          <span className="account">{props.admin}</span>
        </div>
      </div>
    </div>
  );
};
