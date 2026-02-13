import React, { use, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import api from "./api/api";

const PostPge = () => {
  const navigate = useNavigate();

  const { posts, setPosts } = useContext(DataContext);

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

  const { id } = useParams();

  const post = posts.find((pst) => String(pst.id) === id);

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>well..That's disappointing.</p>
            <p>
              <Link to={"/"}> Visit Our HomePage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPge;
