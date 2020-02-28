import React from 'react';
import './styles.scss';

export default props => {
  return (
    <button className={`btn ${props.className || ''}`}>{props.value}</button>
  );
};
