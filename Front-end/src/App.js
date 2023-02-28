import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import Profile from "./components/Profile/Profile";
import { useEffect } from "react";
import Error404 from "./components/Error404";
import "aos/dist/aos.css";
import Aos from "aos";
import NewProduct from "./components/Profile/NewProduct";
import Login from "./components/Login/Login";

function App() {
  
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/inicio" element={<LandingPage />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/productos" element={<Products />} />
            <Route path="/newProduct" element={<NewProduct />} /> 
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
