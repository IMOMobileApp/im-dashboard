import React from "react";

const Skeleton = () => {
  return (
    <div className="skeleton-main-container">
      <div className="skeleton-container">
        <div className="skeleton-box"></div>
        <div className="skeleton-box"></div>
        <div className="skeleton-box"></div>
      </div>

      <div className="skeleton-image-box"></div>
    </div>
  );
};

export default Skeleton;
