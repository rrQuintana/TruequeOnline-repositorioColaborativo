const { Router } = require('express');
const router = Router();

const { getPost, createPost, getPublicacion, getComentariosPublicacion, buscarPublicaciones, deletePost, updatePost } = require('../Controllers/publicacion.controller');

router.route('/')
  .get(getPost)
  .post(createPost)

router.route('/buscar')
  .get(buscarPublicaciones)

router.route('/:id')
  .get(getPublicacion)
  .delete(deletePost)
  .put(updatePost)

  router.route('/comentarios/:id')
  .get(getComentariosPublicacion)

module.exports = router;