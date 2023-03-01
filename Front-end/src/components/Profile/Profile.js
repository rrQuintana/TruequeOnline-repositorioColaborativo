import React, { useState,useContext, useEffect } from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import DefaultUserIcon from "./default-user.png";
import "./Profile.css";
import axi from "axios";

function Profile() {
  const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado
  const { isUser } = useContext(AuthContext); //Obtener los datos del usuario
  
  const [datosUsuaro, setDatosUsuario] = useState([]); //Manejadores de estado para datos de usuario

  //Función para cargar los datos del usuariop
  useEffect(() => {
    async function CargarDatos(){
      
      const campoBuscado = isUser.email; //Correo del usuario      
      const res = await axi.get(`http://localhost:4000/api/usuarios/${campoBuscado}`)
      const InfoUsuario = res.data
      console.log(InfoUsuario)
      setDatosUsuario(InfoUsuario)
    }
    CargarDatos();
  }, []);

  return (
    <>
      
      <NavBar></NavBar>
      
      {isAuthenticated ? (
        
        <div className="bg-secondary vh-100 h-custom d-flex row justify-content-center align-items-center">
          
          <div className="container">
            <Row className="bg-dark py-4">
              <Col
                md={6}
                className="d-flex row justify-content-center align-items-center"
              >
                <Image
                  src={
                    datosUsuaro.foto
                      ? datosUsuaro.foto
                      : DefaultUserIcon
                  }
                  alt="profile pic"
                  style={{ width: "220px", height: "200px" }}
                  roundedCircle
                />
              </Col>
              <Col
                md={6}
                className="d-flex row justify-content-center align-items-center"
              >
                <p>{datosUsuaro.calificacion}</p>
                <h1>{datosUsuaro.nombre + datosUsuaro.apellido}</h1>
                <h3 className="mb-5">{datosUsuaro.email}</h3>
                <p>Teléfono: {datosUsuaro.telefono}</p>
                <p>Ubicación: {datosUsuaro.direccion}</p>
                <p>Contacto: {datosUsuaro.contacto}</p>
                <Button variant="primary">
                  <Link className="text-white" to="/newProduct">Subir un producto</Link>
                </Button>
              </Col>
            </Row>
          </div>
        </div>


      ) : (
        <h1>Sin inicio de sesión</h1>
      )}
      
    </>
  );
}

export default Profile;
