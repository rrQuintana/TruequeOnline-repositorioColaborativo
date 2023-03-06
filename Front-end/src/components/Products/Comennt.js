import React, { useState, useContext, useEffect } from "react";
import { NavBar } from "../LandingPage/NavBar";
import "./Coment.css";


function Comennt() {


    return (
        <div className="all">
            <NavBar></NavBar> 
            <br/> <br/> <br/>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            
            <section class="content-item" id="comments">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8">
                            <form>
                                <h3 class="pull-left">Nuevo Comentario</h3>
                                <button type="submit" class="btn btn-normal pull-right">Enviar</button>
                                <fieldset>
                                    <div class="row">
                                        <div class="col-sm-3 col-lg-2 hidden-xs">
                                            <img class="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                        </div>
                                        <div class="form-group col-xs-12 col-sm-9 col-lg-10">
                                            <textarea class="form-control" id="message" placeholder="Your message" required=""></textarea>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>

                            {/* <!-- COMMENT 1 - START --> */}
                            <div class="media">
                                <a class="pull-left" href="#"><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/></a>
                                <div class="media-body">
                                    <h4 class="media-heading">John Doe</h4>
                                    <p>Hola</p>
                                    <ul class="list-unstyled list-inline media-detail pull-left">
                                        <li><i class="fa fa-calendar"></i>27/02/2014</li>
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Comennt;