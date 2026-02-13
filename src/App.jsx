import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Missing from "./Missing";
import PostPge from "./PostPge";
import NewPost from "./NewPost";
import { format } from "date-fns";
import api from "./api/api";
import EditPost from "../EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { DataProvider } from "./context/DataContext";

function App() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState("");

  const [postTitle, setPostTitle] = useState("");

  const [postBody, setPostBody] = useState("");

  const [posts, setPosts] = useState([]);

  const [editBody, setEditBody] = useState("");

  const [editTitle, setEditTitle] = useState("");

  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts",
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (error) {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.log(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log("Error", error.message);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  const handleDelete = async (id) => {
    try {
      const postsList = posts.filter((post) => post.id !== id);

      const response = await api.delete(`/posts/${id}`);

      setPosts(postsList);
    } catch (error) {
      console.log("error", error.message);
    }

    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const datetime = format(new Date(), "MMMM dd,	yyyy pp");

    const newPost = { id, title: postTitle, body: postBody, datetime };

    try {
      const response = await api.post("/posts", newPost);

      const allPosts = [...posts, response.data];

      setPosts(allPosts);

      setPostBody("");

      setPostTitle("");

      navigate("/");
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd,	yyyy pp");

    const updatePost = { id, title: editTitle, body: editBody, datetime };

    try {
      const response = await api.put(`/posts/${id}`, updatePost);

      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post)),
      );

      setEditBody("");

      setEditTitle("");

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const filteredResult = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()),
    );

    setSearchResults(filteredResult.reverse());
  }, [posts, search]);

  return (
    <div className="App">
      <Header title={"React js Blog"} width={width} />
      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              posts={posts}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPge posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
