import React from "react";
import { Link } from "react-router-dom";
import NavLink from "../../utils/navLink";
import Icon from "@mdi/react";

import "./index.scss";
import { mdiLogout } from "@mdi/js";
import { useDispatch } from "react-redux";
import { authLogout } from "../../actions/loginActions";

export default function({ props }) {
  let dispatch = useDispatch();
  const handleActive = e => {
    e.preventDefault();
    let menu = e.currentTarget;

    let activeMenu = document.getElementsByClassName("active-sidebar-item")[0];
    if (
      activeMenu &&
      menu.getAttribute("id") !== activeMenu.getAttribute("id")
    ) {
      activeMenu.classList.remove("active-sidebar-item");
      menu.classList.add("active-sidebar-item");
    } else {
      menu.classList.toggle("active-sidebar-item");
    }
  };
  const handleLogout = () => {
    
    dispatch(authLogout());
    // props.history.push("/login");
    window.location.replace('/login')
  };
  return (
    <div className="side">
      <ul>
        {NavLink.admin.map((item, index) => {
          return (
            <li
              key={index}
              onClick={handleActive}
              className="li-item"
              id={`menu-item-${index}`}
            >
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
                    marginTop: "0.5rem"
                  }}
                >
                  {item.subNav.length > 1
                    ? item.subNav.map((subItem, index) => (
                        <li key={index} onClick={e => e.stopPropagation()}>
                          <Link to={subItem.link}>{subItem.title}</Link>
                        </li>
                      ))
                    : null}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <Link className="bottom-link" to="" onClick={handleLogout}>
        <Icon className="icon" path={mdiLogout} />
        Logout
      </Link>
    </div>
  );
}
