import React from 'react';
import Button from '../Button/index';
import './index.scss';

export default props => {
  return (
    <div className={props.className}>
      <Button value={props.value} className="redSolidBtn" />
    </div>
  );
};
