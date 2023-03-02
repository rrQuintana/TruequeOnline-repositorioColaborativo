import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import React, { useContext } from "react";

function ProductPage () {
    const { isAuthenticated } = useContext(AuthContext);
    return(
     <div>
        { isAuthenticated ? (
            <>
            <NavBar></NavBar>
            <h1>Hola</h1>

            </>
        ) : (
            <>
            <h1>Debes iniciar sesión</h1>
            </>
        )}
     </div>   
    )
}

export default ProductPage;