import React from 'react';
import './styles.scss';

export default props => {
  return (
    <button className={`btn ${props.className || ''}`} onClick={props.onClick} data-value={props.dataValue}>{props.value}</button>
  );
};
