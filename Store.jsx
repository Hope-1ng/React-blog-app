import { createStore, thunk, action, computed } from "easy-peasy";
import api from "./src/server/api";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),

  search: "",
  setsearch: action((state, payload) => {
    state.search = payload;
  }),

  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),

  editBody: "",
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  editTitle: "",
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),

  postTitle: "",
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),

  PostBody: "",
  setPostBody: action((state, payload) => {
    state.PostBody = payload;
  }),

  postCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id.toString() === id);
  }),

  savePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState();
    try {
      const response = await api.post("/posts", newPost);

      actions.setPosts([...posts, response.data]);

      actions.setPostBody("");

      actions.setPostTitle("");
    } catch (error) {
      console.error("error", error.message);
    }
  }),

  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState();

    try {
      const response = await api.delete(`/posts/${id}`);

      actions.setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log("error", error.message);
    }
  }),

  EditPost: thunk(async (actions, updatePost, helpers) => {
    const id = updatePost.id;

    const { posts } = helpers.getState();

    try {
      const response = await api.put(`/posts/${id}`, updatePost);

      actions.setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post)),
      );

      actions.setEditBody("");

      actions.setEditTitle("");
    } catch (error) {
      console.log(error.message);
    }
  }),
});
