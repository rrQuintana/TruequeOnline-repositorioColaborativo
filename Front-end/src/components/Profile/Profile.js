import React, { useState, useContext, useEffect } from "react";

import { Container, Row, Col, Image,  Card } from "react-bootstrap";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import DefaultUserIcon from "./default-user.png";
import "./Profile.css";
import { db } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import axi from "axios";

function Profile() {
  const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado
  const { isUser } = useContext(AuthContext); //Obtener los datos del usuario
  
  const [datosUsuaro, setDatosUsuario] = useState([]); //Manejadores de estado para datos de usuario
  const [NombreUsuario, setNombreUsuario] = useState(""); //Manejadores de estado para Nombre de usuario
  const [NoUsuario, setNoUsuario] = useState(""); //Manejadores de estado para Nombre de usuario
  const [Telefono, setTelefono] = useState(""); //Manejadores de estado para Telefono
  const [Correo, setCorreo] = useState(""); //Manejadores de estado para Correo
  const [Contacto, setContacto] = useState(""); //Manejadores de estado para Contacto

  //Función para cargar los datos del usuariop
  useEffect(() => {
    async function CargarDatos(){
      
      const campoBuscado = isUser.email; //Correo del usuario      
      const res = await axi.get(`http://localhost:4000/api/usuarios/${campoBuscado}`)
      const InfoUsuario = res.data
      console.log(InfoUsuario)
      setDatosUsuario(InfoUsuario)
    async function CargarDatos() {
      const campoBuscado = isUser.uid; //Id del usuario

      //Hacer el querry de sus datos
      const q = query(
        collection(db, "usuarios"),
        where("Usuario", "==", campoBuscado)
      );

      //Extraer los datos y almacenarlos en variables de estado
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setNombreUsuario(doc.data().Nombre);
        setNoUsuario(doc.data().Usuario);
        setTelefono(doc.data().Telefono);
        setCorreo(doc.data().Correo);
        setContacto(doc.data().Contacto);
      });
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
                    isUser.proactiveRefresh.user.photoURL
                      ? isUser.proactiveRefresh.user.photoURL
                      : DefaulUserIcon
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
                <h1>{NombreUsuario}</h1>
                <h3 className="mb-5">{Correo}</h3>
                <p>Teléfono: {Telefono}</p>
                <p>Contacto: {Contacto}</p>
                <p>Id usuario: {NoUsuario}</p>
                <Button variant="contained">
                  <li className="fas fa-edit"></li> Editar
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
