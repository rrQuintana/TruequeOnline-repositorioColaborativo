const { Router } = require('express');
const router = Router();

const { getComent, createComent, getComentario, getTodo, deleteComent, updateComent } = require('../Controllers/comentario.controller');

router.route('/')
  .get(getComent)
  .post(createComent)

router.route('/:id')
  .get(getComentario)
  .delete(deleteComent)
  .put(updateComent)

  router.route('/todo/:id')
  .get(getTodo)

module.exports = router;