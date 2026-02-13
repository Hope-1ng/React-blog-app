import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPge = ({ posts, handleDelete }) => {
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
