import React from 'react';
import Button from '../Button/index';
import './index.scss';

export default props => {
  return (
    <div id={props.id} className={props.className}>
      <Button value={props.value} className="orderbtn" disabled={props.disabled}/>
    </div>
  );
};
