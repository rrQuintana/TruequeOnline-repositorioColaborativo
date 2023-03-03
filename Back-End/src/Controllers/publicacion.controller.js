const publicacionCtrl = {};

const Publicacion = require('../Models/publicacion.model');
const Comentario = require('../Models/comentario.model');

//////////////////////////{ CRUD Publicaciones }//////////////////////////

publicacionCtrl.getPost = async (req, res) => {
    const publicaciones = await Publicacion.find();
    res.json(publicaciones);
};

publicacionCtrl.createPost = async (req, res) => {
    const { titulo, contenido, categoria, precio, reportes, autor } = req.body;
    const newPost = new Publicacion({
        titulo: titulo,
        contenido: contenido,
        categoria: categoria,
        precio: precio,
        reportes: reportes,
        autor: autor,
    });
    await newPost.save();
    res.json({ message: 'Publicacion creada: ', newPost });
};

publicacionCtrl.getPublicacion = async (req, res) => {
    const publicacion = await Publicacion.findById(req.params.id);
    res.json(publicacion);
};

publicacionCtrl.deletePost = async (req, res) => {
    await Publicacion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Publicacion eliminada' });
};

publicacionCtrl.updatePost = async (req, res) => {
    const { titulo, contenido, autor } = req.body;
    await Publicacion.findByIdAndUpdate(req.params.id, {
        titulo,
        contenido,
        autor
    });
    res.json({ message: 'Publicacion actualizada' });
};

////////////////////////////////////////////////////////////////


publicacionCtrl.buscarPublicaciones = async (req, res) => {
  const publicaciones = await Publicacion.find({ autor: req.params.id });
  res.json(publicaciones);
};

publicacionCtrl.getComentariosPublicacion = (req, res) => {
  Comentario.find({ publicacion: req.params.id })
    .populate('publicacion')
    .exec((err, comentarios) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(comentarios);
    });
};

module.exports = publicacionCtrl;