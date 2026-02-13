import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditPost = ({
  posts,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
  handleEdit,
}) => {
  const { id } = useParams();
  const Post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (Post) {
      setEditBody(Post.body);
      setEditTitle(Post.title);
    }
  }, [Post, setEditBody, setEditTitle]);

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
