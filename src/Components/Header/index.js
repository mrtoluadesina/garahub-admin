import React from "react";
import "./index.scss";

export default props => {
  return (
    <div className="header">
      <a className="logo-section" href="/">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="emall admin" />
        </div>
        <span className="admin"> Admin</span>
      </a>
      <div className="search">
        <i className="fas fa-search"></i>
        <input
          type="search"
          placeholder="Search"
          className="searchInput"
        ></input>
      </div>
      <div className="user">
        <div className="avatar"></div>
        <div className="profile">
          <p className="name">Foluke Edia</p>
          <span className="account">Admin Account</span>
        </div>
      </div>
    </div>
  );
};
