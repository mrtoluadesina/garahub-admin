import React from 'react';

import './index.scss';

export default props => {
  return (
    <div>
      <form>
        <input
          type="text"
          className={props.className}
          placeholder={props.placeholder}
          name="filter"
        ></input>
      </form>
    </div>
  );
};
