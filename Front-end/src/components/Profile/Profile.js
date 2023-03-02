import React, { useContext } from "react";
import { Row, Col, Image, Button, Card } from "react-bootstrap";
import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import DefaultUserIcon from "./default-user.png";
import "./Profile.css";

function Profile() {
  const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado
  const { UserData } = useContext(AuthContext);

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
                    UserData.foto
                      ? UserData.foto
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
                <p>{UserData.calificacion}</p>
                <h1>{UserData.nombre + UserData.apellido}</h1>
                <h3 className="mb-5">{UserData.email}</h3>
                <p>Teléfono: {UserData.telefono}</p>
                <p>Ubicación: {UserData.direccion}</p>
                <p>Contacto: {UserData.contacto}</p>
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
