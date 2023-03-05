import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, ThemeProvider } from "react-bootstrap";
import { NavBar } from "../LandingPage/NavBar";
import "./ProductP.css";
import axios from "axios";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    success: "#DCFFC7",
  },
  palette: {
    success: {
      main: "#DCFFC7",
      darker: "#DCFFC7",
    },
  },
});

function ProductPage() {

  let {id} = useParams();
  const [publicacion, setPublicacion] = useState([]);
  const [autor, setAutor] = useState([]);
  useEffect(() => {
    //Extraer la informacipon del producto y del autor
    const extraerDatos = async () => {
      if (id) {
        //Información del producto
        const res = await axios.get("http://localhost:4000/api/publicaciones/" + id);
        setPublicacion(res.data);   
        console.log(res.data);

        //Información del autor 
        const result = await axios.get("http://localhost:4000/api/usuarios/get/" + res.data.autor);
        setAutor(result.data);
      }
    };
    extraerDatos();   
  },[]);

  return (
    <div className="all">
      <NavBar></NavBar> <br /> <br /> <br />
      <br /> <br />
      <section
        className="section about-section gray-bg vh-100 vh-100 d-flex justify-content-center align-items-center"
        id="about"
      >
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">{publicacion.titulo}</h3>
                <p className="text-black lead">Listado por: {autor.nombre + autor.apellido} </p>
                <h6 className="text-black lead mt-5">Estoy buscando atículos de:</h6>
                <div className="d-flex justify-content-start">
                  <p className="pr-category cDCFFC7">{publicacion.precio}</p>
                </div>
                <h6 className="text-black mt-5">
                  Descripcion de un producto:{" "}
                </h6>
                <div className="pr-descr">
                  <p className="pp">{publicacion.contenido}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-start">
                <h5 className="pr-category mb-5 c5DD315">Categoría: {publicacion.categoria}</h5>
              </div>
              <div className="about-avatar ms-5">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  title=""
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
