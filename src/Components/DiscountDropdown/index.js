import React from "react";

import "./index.scss";

export default props => (
  <select name={props.name} onChange={props.onChange}>
    {props.children}
  </select>
);
