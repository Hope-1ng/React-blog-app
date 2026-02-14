import React from "react";
import { useStoreState } from "easy-peasy";

const Footer = () => {
  const postCount = useStoreState((state) => state.postCount);
  const today = new Date();
  return (
    <div className="Footer">
      {/* <p>CopyRight &copy; {today.getFullYear()}</p> */}
      <p>{postCount} Blog Posts </p>
    </div>
  );
};

export default Footer;
