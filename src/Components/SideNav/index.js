import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from '../../utils/navLink';
import Icon from '@mdi/react';

import './index.scss';
import { mdiSettings } from '@mdi/js';

export default props => {
  const handleActive = e => {
    e.preventDefault();

    // check if the current item subNav is open close it
    let el = e.currentTarget.children[1];
    const allLi = document.getElementsByClassName('li-item');

    // remove all active li
    Array.from(allLi).map(item => {
      if (item.childNodes[1]) {
        item.childNodes[1].hidden = !item.childNodes[1].hidden;
      }
      
    });

    // add active class on the current li item
    if (el) {
      return (el.hidden = false);
    }
  };

  return (
    <div className="side">
      <ul>
        {NavLink.admin.map((item, index) => {
          return (
            <li key={index} onClick={handleActive} className="li-item">
              <Link to={item.link}>
                <div className="nav-item">
                  <Icon className="icon" path={item.icon} />
                  {item.title}
                </div>
                {item.subNav.length > 1 ? (
                  <span className="count">{item.subNav.length}</span>
                ) : null}
              </Link>
              {item.subNav.length > 0 && (
                <ul
                  style={{
                    marginTop: '0.5rem',
                  }}
                  hidden
                >
                  {item.subNav.length > 1
                    ? item.subNav.map((subItem, index) => (
                        <li key={index}>{subItem.title}</li>
                      ))
                    : null}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <Link className="bottom-link" to="/">
        <Icon className="icon" path={mdiSettings} />
        Settings
      </Link>
    </div>
  );
};
