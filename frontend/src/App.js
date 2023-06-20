import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import Navbar from "./components/Navbar";
import Form from "./components/Form"
import SearchFeed from "./components/SearchFeed";
import Profile from "./components/Profile";


function App() {
  const storage = localStorage.getItem("user");
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
   {!isLoginPage && <Navbar />}
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/home" element={<Home />} />
       <Route path="/addproduct" element={<Form />} />
       <Route path="/search/:SearchTerm" element={< SearchFeed/>} />
       <Route path="/profile/:userId" element={< Profile/>} />
     
      {/* {!storage && <Route path="/" element={<Login />} />}
      {storage && <Route path="/home" element={<Home />} />}
      <Route path="/login" element={<Login />} /> */}
    </Routes>
    </>
  );
}

export default App;
