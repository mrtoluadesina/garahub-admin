import React from 'react';

import './styles.scss';

export default props => {
  return (
    <div className={`card ${props.className || ''}`}>{props.children}</div>
  );
};
