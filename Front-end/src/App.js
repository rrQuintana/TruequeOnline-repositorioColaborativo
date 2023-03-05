import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LandingPage from "./components/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import Profile from "./components/Profile/Profile";
import Error404 from "./components/Error404";
import "aos/dist/aos.css";
import Aos from "aos";
import NewProduct from "./components/Profile/NewProduct";
import Login from "./components/Login/Login";
import ProductPage from "./components/Products/ProductPage";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext); //Saber de forma global si hay un usuario autenticado
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setUserData } = useContext(AuthContext);

  useEffect(() => {
    //Animaciones para la página
    Aos.init({ duration: 2000 });

    //Extraer datos del usuario de la memoria local
    const extraerDatos = async () => {
      if (localStorage.getItem("email")) {
        setIsAuthenticated(true);
        const email = localStorage.getItem("email").replace(/['"]+/g, '');
        console.log(email);
        const res = await axios.get(
          `http://localhost:4000/api/usuarios/${email}`
        );
        let InfoUsuario = res.data        
      }
    };
    extraerDatos();    
  }, []);

  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/inicio" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/ProductPage/:id" element={<ProductPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/newProduct" element={<NewProduct />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
