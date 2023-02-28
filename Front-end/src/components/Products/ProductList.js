import React from "react";
import imagenProducto from "../../assets/img/img-prod.png";
import ProductCart from "./ProductCart";
import { db } from "../firebase.config";
import { collection, addDoc, query, getDocs } from "firebase/firestore";


function ProductList() {
  const products = [
    {
      id: 1,
      LinkTo: "https://google.com",
      Imagen: { imagenProducto },
      Titulo: "Titulo",
      Item1: "Item 1",
    },
  ];

  async function Listar(){
    const q = query(collection(db, "productos"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const productData = {
        id: doc.id,
        LinkTo: "https://google.com",
        Imagen: { imagenProducto },
        Titulo: doc.Nombre,
        Item1: doc.Peticion,
      }
      products.push(productData);
      console.log("products: ");
      console.log(products);
      
    });
  }
  

  return (
    <div className="h-custom d-flex row products-list justify-content-center align-items-center">
      <h1>Productos</h1>
      <button className="btn-success" onClick={Listar}>Listar</button>
      <div className="container-fluid d-flex m-3 flex-wrap justify-content-center align-items-center">
        {products.map((product, index) => {          
        return <ProductCart key={index} {...product} />;
      })}
      </div>
    </div>
  );
}

export default ProductList;
