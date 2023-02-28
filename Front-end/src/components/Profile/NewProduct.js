import React, { useState, useEffect } from "react";
import { NavBar } from "../LandingPage/NavBar";
import { db } from "../firebase.config";
import { collection, addDoc, query, getDocs } from "firebase/firestore";

function NewProduct() {
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
      <div>
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Nombre
          </span>
          <input
            id="new-product-name"
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Descipcion
          </span>
          <input
            id="new-product-description"
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />

        <div className="input-group mb-3">
          <label className="input-group-text">Options</label>
          <select className="form-select" id="new-product-request">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={Guardar}>
          Guardar
        </button>
      </div>
    </div>
  );
}

export default NewProduct;
