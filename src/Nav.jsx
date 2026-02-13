import React from "react";
import { Link } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useContext } from "react";

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <div className="Nav">
      <form
        className="searchForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="search">Search Posts</label>
        <input
          type="text"
          placeholder="Search Posts"
          id="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/post"}>Posts</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
