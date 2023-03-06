import React from "react";
import { Link } from "react-router-dom";
import imagen from "../../assets/img/img-prod.png";

function ProductCart({_id, titulo, contenido, categoria, precio}) {
  return (
    <Link to={"/ProductPage/" + _id} style={{ textDecoration: "none" }}>
      <div className=" product-bx d-flex row flex-wrap justify-content-center align-items-center">
        <div className="product-img-container my-2 d-flex flex-wrap justify-content-center align-items-center">
          <img src={imagen} alt="imagen producto" />
        </div>
        <h4 className="product-bx-h">{titulo}</h4>
        <div className="product-bx-p-description">{contenido}</div>
        <p className="product-bx-p mt-2">Acepta artículos de:</p>
        <div className="product-items-box d-flex flex-wrap justify-content-center align-items-center">
          <span>{precio}</span>
        </div>
        <p className="mt-2">Categoría: {categoria}</p>
      </div>
    </Link>
  );
}

export default ProductCart;