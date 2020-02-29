import React from 'react';
import { Link } from 'react-router-dom';

import CardTab from '../../utils/cardTab';

import './styles.scss';

export default props => {
  return (
    <div className="card-tab">
      <ul className="card-tab-ul customer-ul">
        {CardTab.customerTab.map((item, index) => {
          return (
            <li key={index} className="tab-li customer-li">
              <Link to={item.path} className="tab-link">
                <div>{item.name}</div>
              </Link>
            </li>
          );
        })}
        {props.children}
      </ul>
    </div>
  );
};
