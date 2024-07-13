import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import store from "./store/store";
import { deletePost, addPost, addPosts } from "./store/postsSlice";
import { useDispatch, useSelector } from "react-redux";

import { api } from "./store/api";

function App() {
const posts = useSelector((state) => state.postsReducer.posts);
const dispatch = useDispatch()

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts(){
    try {
      const response =await api.get("/posts")
      dispatch(addPosts(response.data))
    } catch (error) {
      
    }
  }
  fetchPosts()
  }, [])

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
     await api.post("/posts", newPost);
      dispatch(addPost(newPost))
    } catch (error) {
      
    }

    dispatch(addPost(newPost));
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  const handleDelete = async(id) => {
   try {
    const response = await api.delete(`/posts${id}`);
    dispatch(deletePost(id))
    navigate("/");
   } catch (error) {
    
   }
  };

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />
        <Route
          path='/post'
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
          path='/post/:id'
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path='/about' component={<About />} />
        <Route path='*' component={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
