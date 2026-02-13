import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Missing from "./Missing";
import PostPge from "./PostPge";
import NewPost from "./NewPost";
import { DataProvider } from "./context/DataContext";
import EditPost from "../EditPost";

function App() {
  return (
    <div className="App">
      <Header title={"React js Blog"} />
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPge />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
