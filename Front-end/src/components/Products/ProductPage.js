import { NavBar } from "../LandingPage/NavBar";
import { AuthContext } from "../../AuthContext";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/img/SVG/Logo.svg";
import "./ProductP.css";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


function ProductPage() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div>
            {isAuthenticated ? (
                <div className="all">
                    <NavBar></NavBar> <br /> <br /> <br />
                    <Button>
                        <Link to="/productos" className="btn">Regresar a Productos</Link>
                    </Button>
                    <br /> <br />
                    <div className="contenedor">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography variant="h5" component="div">
                                    be{bull}nev{bull}o{bull}lent
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography variant="body2">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        <div className="formulario">
                            <form>
                                <label type="Title" className="titulo">Titulo:</label>
                                <br /><br />
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" /><br /><br />
                                <label htmlFor="mensaje">Mensaje:</label>
                                <textarea id="mensaje" name="mensaje"></textarea><br /><br />
                                <input type="submit" value="Enviar" />
                            </form>
                        </div>
                    </div>

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
