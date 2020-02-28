import React from 'react';

import './index.scss';

export default props => {
  return (
    <div>
      <select>{props.children}</select>
    </div>
  );
};
