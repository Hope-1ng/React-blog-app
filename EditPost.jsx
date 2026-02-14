import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";

const EditPost = () => {
  const navigate = useNavigate();

  const posts = useStoreState((state) => state.posts);

  const setPosts = useStoreActions((actions) => actions.setPosts);

  const editBody = useStoreState((state) => state.editBody);

  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const editTitle = useStoreState((state) => state.editTitle);

  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);

  const getPostById = useStoreState((state) => state.getPostById);

  const EditPost = useStoreActions((actions) => actions.EditPost);

  const { id } = useParams();

  const Post = getPostById(id);

  useEffect(() => {
    if (Post) {
      setEditBody(Post.body);
      setEditTitle(Post.title);
    }
  }, [Post, setEditBody, setEditTitle]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd,	yyyy pp");

    const updatePost = { id, title: editTitle, body: editBody, datetime };

    EditPost(updatePost);

    navigate("/");
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
