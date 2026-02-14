import React from "react";
import { Link } from "react-router-dom";
import { useStoreActions,useStoreState } from "easy-peasy";
import { useEffect } from "react";


const Nav = () => {

  const search =useStoreState((state)=>state.search);

  const setSearch=useStoreActions((actions)=>{actions.setSearch});

  const posts =useStoreState((state)=>state.posts);

 

   const setSearchResults= useStoreActions((actions)=>actions.setSearchResults)




    useEffect(() => {
      const filteredResult = posts.filter(
        (post) =>
          post.body.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase()),
      );
  
      setSearchResults(filteredResult.reverse());
    }, [posts, search,setSearchResults]);
  
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
