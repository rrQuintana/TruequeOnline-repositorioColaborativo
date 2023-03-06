import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import DefaultUserIcon from "./default-user.png";
import "./Profile.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: 'black',
  // border: '2px solid #000',
  // boxShadow: 24,
  color: "transparent",
  p: 4,
};

function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); //Saber si el usuario está autenticado
  const { UserData } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [lista, setLista] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const getPubliaciones = async () => {
        const res = await axios.get(
          `http://localhost:4000/api/publicaciones/buscar/${UserData._id}`
        );
        setLista(res.data);
      };
      getPubliaciones();
    }
  }, [lista]);

  const eliminarProducto = async (id) => {
    window.confirm("¿Está seguro de eliminar este producto?")
      ? await axios.delete(`http://localhost:4000/api/publicaciones/${id}`)
      : window.alert("No se eliminó el producto");
  };

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
                  src={UserData.foto ? UserData.foto : DefaultUserIcon}
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
                  <Link className="text-white" to="/newProduct">
                    Subir un producto
                  </Link>
                </Button>
                <Button onClick={handleOpen} color="error">
                  Editar Perfil
                </Button>
                <Modal open={open} onClose={handleClose}>
                  <Box>
                    <div class="todo">
                      <div class="signupFrm">
                        <form action="" class="form">
                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">
                              Nombre
                            </label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">
                              Apellido
                            </label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">
                              Foto
                            </label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">
                              Telefono
                            </label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">
                              Direccion
                            </label>
                          </div>

                          <div class="inputContainer">
                            <input type="text" class="input" placeholder="a" />
                            <label for="" class="label">
                              Contacto
                            </label>
                          </div>

                          {/* <input type="submit" class="submitBtn" value="Guardar" onClick={handleClose} /> */}
                          <Button onClick={handleClose}>Guardar</Button>
                        </form>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </Col>
              <div>
                <h1 className="m-5">Mis productos:</h1>
                <div className="container-fluid d-flex m-3 flex-wrap justify-content-center align-items-center">
                  {lista.map((list) => (
                    <div
                      className="product-bx d-flex row flex-wrap justify-content-center align-items-center"
                      key={list._id}
                    >
                      <div className="product-img-container my-2 d-flex flex-wrap justify-content-center align-items-center">
                        <img src={DefaultUserIcon} alt="imagen producto" />
                      </div>
                      <h4 className="product-bx-h d-flex flex-wrap justify-content-center align-items-center">
                        {list.titulo}
                      </h4>
                      <div className="product-bx-p-description">
                        {list.contenido}
                      </div>
                      <p className="product-bx-p mt-2 d-flex flex-wrap justify-content-center align-items-center">
                        Acepta artículos de:
                      </p>
                      <div className="product-items-box d-flex flex-wrap justify-content-center align-items-center">
                        <span>{list.precio}</span>
                      </div>
                      <p className="mt-2 product-bx-p-description d-flex flex-wrap justify-content-center align-items-center">
                        Categoría: {list.categoria}
                      </p>
                      <button
                        className="btn-danger"
                        onClick={() => eliminarProducto(list._id)}
                      >
                        Eliminar
                      </button>
                      <Link
                        to={`/ProductEdit/${list._id}`}
                        className="btn-primary"
                      >
                        Editar
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Row>
          </div>
        </div>
      ) : (
        <div className="w-100 vh-100 bg-white">
          <NavBar></NavBar> <br /> <br /> <br /> <br />
        <h1 className="text-dark mt-5 d-flex align-items-center justify-content-center">Debes iniciar sesión para acceder a esta página</h1>
        <h3 onClick={()=>navigate("/login")} className="text-dark mt-5 d-flex align-items-center justify-content-center"><a href="#">Ir a login</a></h3>
        </div>
      )}
    </>
  );
}

export default Profile;
