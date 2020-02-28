import React from 'react';

import './index.scss';

export default props => {
  return (
    <div className="table">
      <table className="responsive-table">{props.children}</table>
    </div>
  );
};
