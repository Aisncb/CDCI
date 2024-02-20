const Ruta = require("../models/ruta.model.js");

async function getAllRutas(req, res) {
  try {
    const rutas = await Ruta.findAll({ paranoid: false });
    if (rutas) {
      return res.status(200).json(rutas);
    } else {
      return res.status(404).send("Rutas no encontradas");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneRuta(req, res) {
  try {
    const ruta = await Ruta.findByPk(req.params.id);
    if (ruta) {
      return res.status(200).json(ruta);
    } else {
      return res.status(404).send("Ruta no encontrada");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createRuta(req, res) {
  try {
    const ruta = await Ruta.create(req.body);
    return res
      .status(200)
      .json({ message: "Ruta creada", ruta: ruta });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateRuta(req, res) {
  try {
    const [rutaExist, ruta] = await Ruta.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    if (rutaExist !== 0) {
      return res
        .status(200)
        .json({ message: "Ruta Actualizada", ruta: ruta });
    } else {
      return res.status(404).send("Ruta no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteRuta(req, res) {
  try {
    const ruta = await Ruta.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (ruta) {
      return res.status(200).json("Ruta Eliminada");
    } else {
      return res.status(404).send("Ruta no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllRutas,
  getOneRuta,
  createRuta,
  updateRuta,
  deleteRuta,
};
