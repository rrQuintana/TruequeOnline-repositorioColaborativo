import React, { useContext } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import DefaultUserIcon from "./default-user.png";
import "./Profile.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'black',
  // border: '2px solid #000',
  // boxShadow: 24,
  color: 'transparent',
  p: 4,
};


function Profile() {
  const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado
  const { UserData } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
                <h1>{UserData.nombre + " " + UserData.apellido}</h1>
                <h3 className="mb-5">{UserData.email}</h3>
                <p>Teléfono: {UserData.telefono}</p>
                <p>Ubicación: {UserData.direccion}</p>
                <p>Contacto: {UserData.contacto}</p>
                <Button variant="contained">
                  <Link className="text-white" to="/newProduct">Subir un producto</Link>
                </Button>
                <Button onClick={handleOpen} color="error" >Editar Perfil</Button>
                <Modal
                 
                  open={open}
                  onClose={handleClose}
                >
                  <Box >
                    <div class="todo">
                      <div class="signupFrm">
                        <form action="" class="form">

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Nombre</label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Apellido</label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Foto</label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Telefono</label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Direccion</label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">Contacto</label>
                          </div>

                          {/* <input type="submit" class="submitBtn" value="Guardar" onClick={handleClose} /> */}
                          <Button onClick={handleClose}>Guardar</Button>
                        </form>
                      </div>
                    </div>
                  </Box>
                </Modal>
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
