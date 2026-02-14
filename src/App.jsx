import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Missing from "./Missing";
import PostPge from "./PostPge";
import NewPost from "./NewPost";
import useAxiosFetch from "./hooks/useAxiosFetch";
import EditPost from "../EditPost";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";

function App() {
  
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts",
  );

  useEffect(() => {
    setPosts(data);
  }, [data,setPosts]);

  return (
    <div className="App">
      <Header title={"React js Blog"} />
      <Nav />
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading}  fetchError={fetchError} />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPge />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
