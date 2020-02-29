import React from 'react';
import { Link } from 'react-router-dom';

import CardTab from '../../utils/cardTab';

import '../CardTab/index.scss';

export default props => {
  return (
    <div className="card-tab">
      <ul className="card-tab-ul">
        {CardTab.drafts.map((item, index) => {
          return (
            <li key={index} className="tab-li">
              <Link to={item.path} className="tab-link">
                <div>{item.name}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
