import React from 'react';
import Masonry from "react-masonry-css";
import './styles.scss'

export default props => {
  const breakpointColumnsObj = {
    default: 3,
    768: 2,
    414: 1
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {props.children}
    </Masonry>
  );
};
