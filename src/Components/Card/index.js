import React from 'react';

import './styles.scss';

export default props => {
  return (
    <div className={`main-card ${props.className || ''}`}>{props.children}</div>
  );
};
