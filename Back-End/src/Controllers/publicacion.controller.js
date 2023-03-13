const publicacionCtrl = {};

const Publicacion = require('../Models/publicacion.model');
const Comentario = require('../Models/comentario.model');

//////////////////////////{ CRUD Publicaciones }//////////////////////////

publicacionCtrl.getPost = async (req, res) => {
    const publicaciones = await Publicacion.find();
    res.json(publicaciones);
};

publicacionCtrl.createPost = async (req, res) => {
    const { titulo, contenido, foto, categoria, precio, reportes, autor } = req.body;
    const newPost = new Publicacion({
        titulo: titulo,
        contenido: contenido,
        foto: foto,
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
    const { titulo, contenido, foto, categoria, precio } = req.body;
    await Publicacion.findByIdAndUpdate(req.params.id, {
        titulo: titulo,
        contenido: contenido,
        foto: foto,
        categoria: categoria,
        precio: precio,
    });
    res.json({ message: 'Publicacion actualizada con Exito!!!' });
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

publicacionCtrl.getUsuariosComentariosPublicacion = async (req, res) => {
  try {
    const comentarios = await Comentario.find({ publicacion: req.params.id });
    const usuarios = {};
    comentarios.forEach(comentario => {
      usuarios[comentario.usuario] = true;
    });
    res.status(200).json(Object.keys(usuarios));
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Hubo un error al obtener los usuarios que comentaron la publicación.' });
  }
};

module.exports = publicacionCtrl;