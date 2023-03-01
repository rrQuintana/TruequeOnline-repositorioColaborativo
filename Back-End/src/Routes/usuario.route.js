const { Router } = require('express');
const router = Router();

const { getUser, 
  createUser, 
  getUsuario, 
  getUsuarioPublicaciones, 
  deleteUser, 
  updateUser,
  comentariosPersona,
} = require('../Controllers/usuario.controller');

router.route('/')
  .get(getUser)
  .post(createUser)

router.route('/:email')
  .get(getUsuario)
  .delete(deleteUser)
  .put(updateUser)

router.route('/comentarios/:id')
  .get(comentariosPersona)

router.route('/publicaciones/:id')
  .get(getUsuarioPublicaciones)

module.exports = router;