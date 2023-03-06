const { Router } = require('express');
const router = Router();

const { getUser, 
  createUser, 
  getUsuario, 
  getUsuarioById,
  getUsuarioPublicaciones, 
  deleteUser, 
  updateUser,
  comentariosPersona,
} = require('../Controllers/usuario.controller');

router.route('/')
  .get(getUser)
  .post(createUser)

router.route('/get/:id')
  .get(getUsuarioById)

router.route('/:email')
  .get(getUsuario)
  .delete(deleteUser)

router.route('/:id')
  .put(updateUser)

router.route('/comentarios/:id')
  .get(comentariosPersona)

router.route('/publicaciones/:id')
  .get(getUsuarioPublicaciones)

module.exports = router;