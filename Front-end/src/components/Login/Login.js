import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import backgroundImage from "./background.jpg";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "../../AuthContext";
import { db } from "../firebase.config";
import { collection, addDoc, query, getDocs } from "firebase/firestore";

function Login() {
  const [ registro, setRegistro ] = useState(true); //Manejadores de estado para registrar o logear
  const [ ErrMessage, setErrMessage ] = useState(null); //Manejador de estado para el mensaje de error
  const navigate = useNavigate();

  //Data de login con Google
  const auth = getAuth();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  //Crear un usuario
  function Registrar() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        //Guardar datos del usuario para registrarlos en la base de datos
        const NoUsuario = user.uid;
        const Correo = email;
        const NombreUsuario = document.getElementById("NombreUsuario").value;
        const TelefonoUsuario = document.getElementById("TelefonoUsuario").value;
        const Contacto = "Sin asignar";

        //Guardar los datos del usuario en la base de datos
        RegistrarDatos(NoUsuario, Correo, NombreUsuario, TelefonoUsuario, Contacto);

        //Alerta de registro exitoso
        window.alert(user.email + " registrado con exito");

        //Limpiar los inputs
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        setRegistro(!registro);
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert("Error en el registro", errorMessage);
        console.error("Error en el registro", errorMessage);
      });
  }

  //Ingresar usuario
  function Ingresar() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        setIsAuthenticated(true);
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error en Login", errorMessage);
        errorMessage === "Firebase: Error (auth/wrong-password)." ? setErrMessage("Contraseña incorrecta") : setErrMessage("Correo no registrado")
        console.log(ErrMessage);
      });
  }

  //Funcion para registrar datos en la base de datos
  async function RegistrarDatos(NoUsuario, Correo, NombreUsuario, TelefonoUsuario, Contacto) {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        Usuario: NoUsuario,
        Nombre: NombreUsuario,
        Telefono: TelefonoUsuario,
        Correo: Correo,
        Contacto: Contacto,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      console.log(e.message);
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        padding: "2rem",
      }}
    >
      <Container className="min-vh-100">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div
              style={{ backgroundColor: "white", padding: "2rem" }}
              className="mt-3"
            >
              <div className="d-flex">
                <h1 className="text-black ms-3">Xchange Life</h1>
                <a
                  href="#"
                  className="m-auto me-5 text-secondary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Regresar
                </a>
              </div>

              <br />
              {registro ? (
                <h2 className="text-black my-3">Login</h2>
              ) : (
                <h2 className="text-black my-3">Sign in</h2>
              )}
              <Form name="formulario">
                {!registro && (
                  <>
                    <Form.Group>
                      <h5 className="text-secondary mt-4">Nombre*</h5>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        id="NombreUsuario"
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <h5 className="text-secondary mt-4">Teléfono</h5>
                      <Form.Control
                        type="text"
                        placeholder="Enter phone"
                        id="TelefonoUsuario"
                      />
                    </Form.Group>
                  </>
                )}

                <Form.Group>
                  <h5 className="text-secondary mt-4">Correo*</h5>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <h5 className="text-secondary mt-4">Contraseña*</h5>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                  />
                </Form.Group>

                <p className="text-danger mt-2" id="error-message">{ErrMessage}</p>

                <div className="d-flex d-flex row justify-content-center align-items-center">
                  {registro ? (
                    <>
                      <Button
                        variant="primary"
                        className="mt-5 py-2 w-50"
                        onClick={Ingresar}
                      >
                        Ingresar
                      </Button>
                      <p className="text-secondary mt-3 d-flex justify-content-center align-items-center">
                        No tienes cuenta? &nbsp;
                        <a
                          href="#"
                          onClick={() => {
                            setRegistro(!registro);
                            setErrMessage(null);
                          }}
                        >
                          {" "}
                          Registrate
                        </a>
                      </p>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        className="mt-4 py-2 w-50"
                        onClick={Registrar}
                      >
                        Registrar
                      </Button>
                      <p className="text-secondary mt-3 d-flex justify-content-center align-items-center">
                        Ya tienes cuenta?&nbsp;
                        <a
                          href="#"
                          onClick={() => {
                            setRegistro(!registro);
                          }}
                        >
                          {" "}
                          Ingresa
                        </a>
                      </p>
                    </>
                  )}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
