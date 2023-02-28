import React from "react";
import { Link } from "react-router-dom";
import imagen from "../../assets/img/img-prod.png";

function ProductCart({id, LinkTo, Imagen, Titulo, Item1, Item2, Item3, Item4, Item5}) {
  return (
    <Link to={LinkTo} style={{ textDecoration: "none" }} target="_blank">
      <div className=" product-bx d-flex row flex-wrap justify-content-center align-items-center">
        <div className="product-img-container my-2 d-flex flex-wrap justify-content-center align-items-center">
          <img src={imagen} alt="imagen producto" />
        </div>
        <h4>{Titulo}</h4>
        <p className="product-bx-p">Acepta:</p>
        <div className="product-items-box d-flex flex-wrap justify-content-center align-items-center">
          <span>{Item1}</span>
          <span>{Item2}</span>
          <span>{Item3}</span>
          <span>{Item4}</span>
          <span>{Item5}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCart;