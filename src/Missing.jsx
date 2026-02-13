import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="Missing">
      <h2>Post Not Found</h2>
      <p>well..That's disappointing.</p>
      <p>
        <Link to={"/"}> Visit Our HomePage</Link> 
      </p>
    </div>
  );
};

export default Missing;
