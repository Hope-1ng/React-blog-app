import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DataContext from "./src/context/DataContext";
import { format } from "date-fns";
import api from "./src/api/api";

const EditPost = () => {
  
  const navigate = useNavigate();

  const { posts, setPosts } = useContext(DataContext);

  const [editBody, setEditBody] = useState("");

  const [editTitle, setEditTitle] = useState("");

  const { id } = useParams();
  const Post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (Post) {
      setEditBody(Post.body);
      setEditTitle(Post.title);
    }
  }, [Post, setEditBody, setEditTitle]);

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

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>EditPost</h2>
          <form
            className="newPostForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="editTitle">Title:</label>
            <input
              type="text"
              id="editTitle"
              required
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
            <label htmlFor="editBody">Post:</label>
            <input
              type="text"
              id="editBody"
              required
              value={editBody}
              onChange={(e) => {
                setEditBody(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                handleEdit(Post.id);
              }}
            >
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>well..That's disappointing.</p>
          <p>
            <Link to={"/"}> Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
