import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import axios from "axios";

function ProductList() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getPubliaciones = async () => {
      const res = await axios.get("http://localhost:4000/api/publicaciones");
      setLista(res.data);
    };
    getPubliaciones();
  }, [lista]);

  return (
    
    <div className="h-custom d-flex row products-list justify-content-center align-items-center">
      <h1>Productos</h1>
      <div className="container-fluid d-flex m-3 flex-wrap justify-content-center align-items-center">
        {lista.map((product, index) => {
          return <ProductCart key={index} {...product} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
