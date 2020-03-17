import React from 'react';

import './index.scss';

export default props => <select onChange={props.change}>{props.children}</select>

