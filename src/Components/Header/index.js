import React from 'react';
import './index.scss';

export default props => {
  return (
    <div className="header">
      <div>
        <h2 className="logo">
          eMall
          <span className="admin"> Admin</span>
        </h2>
      </div>
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
