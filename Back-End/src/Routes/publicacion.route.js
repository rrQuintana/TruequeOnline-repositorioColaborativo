const { Router } = require("express");
const router = Router();

const {
  getPost,
  createPost,
  getPublicacion,
  getComentariosPublicacion,
  buscarPublicaciones,
  deletePost,
  updatePost,
  getUsuariosComentariosPublicacion,
  getPublicacionesPorCategoria
} = require("../Controllers/publicacion.controller");

router.route("/").get(getPost).post(createPost);

router.route("/:id").get(getPublicacion).delete(deletePost).put(updatePost);

router.route("/buscar/:id").get(buscarPublicaciones);

router.route("/buscar/categoria/:categoria").get(getPublicacionesPorCategoria);

router.route("/comentarios/:id").get(getComentariosPublicacion);

router.route("/comentarios/usuarios/:id").get(getUsuariosComentariosPublicacion);

module.exports = router;
