import React, { useContext } from "react";
import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import DataContext from "./context/DataContext";


const Header = ({ title }) => {

  const {width}=useContext(DataContext)
  return (
    <header className="Header">
      <p>{title}</p>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 979 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
