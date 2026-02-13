import React from "react";
import Feed from "./Feed";
import DataContext from "./context/DataContext";
import { useContext } from "react";

const Home = () => {

  const { searchResults, fetchError, isLoading } = useContext(DataContext);

 
  
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading Posts......</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!fetchError &&
        !isLoading &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p style={{ marginTop: "2rem" }}> No Posts Avialable!!</p>
        ))}
    </main>
  );
};

export default Home;
