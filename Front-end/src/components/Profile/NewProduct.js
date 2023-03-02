import React, { useState, useContext } from "react";
import { NavBar } from "../LandingPage/NavBar";
import { db } from "../firebase.config";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import axios from "axios";

function NewProduct() {
  const { UserData } = useContext(AuthContext);

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
      <NavBar></NavBar> <br /> <br /> <br /> <br />
      <h1>Agregar productos</h1>
      <div className="w-50">
        <form onSubmit={guardarData}>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Título
            </span>
            <input
              id="publicacion-titulo"
              name="titulo"
              type="text"
              className="form-control"
              placeholder="Título"
              onChange={capturarData}
            />
          </div>
          <br />

          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Descipción
            </span>
            <input
              id="publicacion-contenido"
              name="contenido"
              type="text"
              className="form-control"
              placeholder="Descripción"
              onChange={capturarData}
            />
          </div>
          <br />

          <div className="input-group mb-3">
            <label className="input-group-text">Categoría</label>
            <select
              id="publicacion-categoria"
              name="categoria"
              onChange={capturarData}
            >
              <option value="">Seleccione una categoría</option>
              <option value="ropa">Ropa y accesorios</option>
              <option value="electronica">Electrónica</option>
              <option value="hogar">Hogar y jardín</option>
              <option value="deportes">
                Deportes y actividades al aire libre
              </option>
              <option value="belleza">Belleza y cuidado personal</option>
              <option value="juguetes">Juguetes y juegos</option>
              <option value="alimentos">Alimentos y bebidas</option>
              <option value="mascotas">Animales y mascotas</option>
            </select>
          </div>

          <div className="input-group mb-3">
            <label
              className="input-group-text"
              name="precio"
              onChange={capturarData}
            >
              Precio
            </label>
            <select
              id="publicacion-precio"
              name="precio"
              onChange={capturarData}
            >
              <option value="">Yo quiero recibir..</option>
              <option value="">Dinero (especificar en descripción)</option>
              <option value="ropa">Ropa y accesorios</option>
              <option value="electronica">Electrónica</option>
              <option value="hogar">Hogar y jardín</option>
              <option value="deportes">
                Deportes y actividades al aire libre
              </option>
              <option value="belleza">Belleza y cuidado personal</option>
              <option value="juguetes">Juguetes y juegos</option>
              <option value="alimentos">Alimentos y bebidas</option>
              <option value="mascotas">Animales y mascotas</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
