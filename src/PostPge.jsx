import React, { use, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "./api/api";
import { useStoreActions, useStoreState } from "easy-peasy";

const PostPge = () => {
  const navigate = useNavigate();

  const deletePost = useStoreActions((actions) => actions.deletePost);

  const getPostById = useStoreState((state) => state.getPostById);

  const { id } = useParams();

  const post = getPostById(id);

  const handleDelete = async (id) => {
    deletePost(id);

    navigate("/");
  };

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
