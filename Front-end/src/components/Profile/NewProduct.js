import React, { useState, useContext, useEffect } from "react";
import { NavBar } from "../LandingPage/NavBar";
import { db } from "../firebase.config";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const navigate = useNavigate();

  const { UserData } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
  //Manejadores de estado para publicaciones
  const Publicacion = {
    titulo: "",
    contenido: "",
    categoria: "",
    precio: "",
    reportes: 0,
    autor: UserData._id,
  };
  const [publicacion, setPublicacion] = useState(Publicacion);

  const capturarData = (e) => {
    const { name, value } = e.target;
    setPublicacion({ ...publicacion, [name]: value });
  };

  const guardarData = async (e) => {
    e.preventDefault();

    try {
      //Crear función post
      const newPublicacion = {
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        categoria: publicacion.categoria,
        precio: publicacion.precio,
        reportes: publicacion.reportes,
        autor: publicacion.autor,
      };
      console.log(newPublicacion);

      await axios.post(
        "http://localhost:4000/api/publicaciones",
        newPublicacion
      );

      setPublicacion({ ...Publicacion });
      window.alert("Publicación guardada ", publicacion.titulo);
    } catch (e) {
      window.alert("Error al guardar publicación");
    }
  };

  //Funcion para guardar datos en la base de datos
  async function Guardar() {
    try {
      const docRef = await addDoc(collection(db, "productos"), {
        Nombre: document.getElementById("new-product-name").value,
        Descripcion: document.getElementById("new-product-description").value,
        Peticion: document.getElementById("new-product-request").value,
        Reportes: 0,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
        <NavBar></NavBar> <br /> <br /> <br /> <br />
          <h1>Agregar productos</h1>
          <div className="w-50">
            <form onSubmit={guardarData}>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Título*
                </span>
                <input
                  id="publicacion-titulo"
                  name="titulo"
                  type="text"
                  className="form-control"
                  placeholder="Título"
                  onChange={capturarData}
                  required
                />
              </div>
              <br />

              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Descipción*
                </span>
                <input
                  id="publicacion-contenido"
                  name="contenido"
                  type="text"
                  className="form-control"
                  placeholder="Descripción"
                  onChange={capturarData}
                  required
                />
              </div>
              <br />

              <div className="input-group mb-3">
                <label className="input-group-text">Categoría*</label>
                <select
                  id="publicacion-categoria"
                  name="categoria"
                  onChange={capturarData}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="ropa">Ropa y accesorios</option>
                  <option value="electrónica">Electrónica</option>
                  <option value="hogar">Hogar y jardín</option>
                  <option value="deportes">
                    Deportes y actividades al aire libre
                  </option>
                  <option value="belleza">Belleza y cuidado personal</option>
                  <option value="juguetes">Juguetes y juegos</option>
                  <option value="alimentos">Alimentos y bebidas</option>
                  <option value="animales">Animales y mascotas</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  name="precio"
                  onChange={capturarData}
                >
                  Precio*
                </label>
                <select
                  id="publicacion-precio"
                  name="precio"
                  onChange={capturarData}
                  required
                >
                  <option value="">Yo quiero recibir..</option>
                  <option value="">Dinero (especificar en descripción)</option>
                  <option value="Ropa y accesorios">Ropa y accesorios</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Hogar y jardín">Hogar y jardín</option>
                  <option value="Deportes">
                    Deportes y actividades al aire libre
                  </option>
                  <option value="Belleza">Belleza y cuidado personal</option>
                  <option value="Juguetes">Juguetes y juegos</option>
                  <option value="Alimentos">Alimentos y bebidas</option>
                  <option value="Animales">Animales y mascotas</option>
                </select>
              </div>

              <button className="btn btn-primary" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="w-100 vh-100 bg-white">
          <NavBar></NavBar> <br /> <br /> <br /> <br />
        <h1 className="text-dark mt-5 d-flex align-items-center justify-content-center">Debes iniciar sesión para acceder a esta página</h1>
        <h3 onClick={()=>navigate("/login")} className="text-dark mt-5 d-flex align-items-center justify-content-center"><a href="#">Ir a login</a></h3>
        </div>
      )}
    </div>
  );
}

export default NewProduct;
