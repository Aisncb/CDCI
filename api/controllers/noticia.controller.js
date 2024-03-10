const Noticia = require("../models/noticia.model.js");
const { notify } = require("../routes/actividad.router.js");

async function getAllNoticias(req, res) {
  try {
    const noticias = await Noticia.findAll({ paranoid: false });
    if (noticias) {
      return res.status(200).json(noticias);
    } else {
      return res.status(404).send("Noticias no encontradas");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneNoticia(req, res) {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (noticia) {
      return res.status(200).json(noticia);
    } else {
      return res.status(404).send("Noticia no encontrada");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createNoticia(req, res) {
  try {
    const noticia = await Noticia.create(req.body);
    return res
      .status(200)
      .json({ message: "Noticia creada", noticia: noticia });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateNoticia(req, res) {
  try {
    const [noticiaExist, noticia] = await Noticia.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    if (noticiaExist !== 0) {
      return res
        .status(200)
        .json({ message: "Noticia Actualizada", noticia: noticia });
    } else {
      return res.status(404).send("Noticia no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteNoticia(req, res) {
  try {
    const noticia = await Noticia.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (noticia) {
      return res.status(200).json("Noticia Eliminada");
    } else {
      return res.status(404).send("Noticia no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllNoticias,
  getOneNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
};
