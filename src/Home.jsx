import React from "react";
import Feed from "./Feed";
import { useStoreActions ,useStoreState} from "easy-peasy";

const Home = ({ fetchError, isLoading }) => {

  const  searchResults  = useStoreState((state) => state.searchResults);

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
