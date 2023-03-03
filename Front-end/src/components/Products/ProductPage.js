import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import React, { useContext } from "react";
import { Button, ThemeProvider } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/img/SVG/Logo.svg";
import "./ProductP.css";

import Box from '@mui/material/Box';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    success: '#DCFFC7',
  },
  palette: {
    success: {
      main: '#DCFFC7',
      darker: '#DCFFC7',
    }
  },
});

function ProductPage() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div>
            {isAuthenticated ? (
                <div className="all">
                    <NavBar></NavBar> <br /> <br /> <br />
                    <br /> <br />
                    <section className="section about-section gray-bg" id="about">
                        <div className="container">
                            <div className="row align-items-center flex-row-reverse">
                                <div className="col-lg-6">
                                    <div className="about-text go-to">
                                        <h3 className="dark-color">Celular Huawei</h3>
                                        <br></br>
                                        
                                        <h6 className="theme-color lead">Listado por: Oliver Gil </h6>
                                        <h6 className="theme-color lead">Precio: <p >El precio es  de 5,000 </p></h6>

                                        <Chip label="Electrodomesticos" color="success" variant="outlined"/>
                                        <br></br>
                                        <br></br>
                                        <p style={{color: 'black'}}>Descripcion de un producto: </p>
                                        <p className="pp">Es un celular de la marca Huaei con 32 gb de ram y un porcesador snaopdragon bla bla</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-avatar">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </section>
                    <Button className="btn22">
                        <Link to="/productos" className="btn">Regresar a Productos</Link>
                    </Button>
                </div>
            ) : (
                <div className="all2">
                    <h1>Debes iniciar sesión</h1>
                </div>
            )}
        </div>
    )
}

export default ProductPage;
