import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import SocialContext from "./ContextStore/SocialContext";
function App() {
  const { userinfo } = useContext(SocialContext);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={userinfo ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userId"
            element={userinfo ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={userinfo ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={userinfo ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
