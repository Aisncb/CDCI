const Actividad = require("../models/actividad.model.js");

async function getAllActividades(req, res) {
  try {
    const actividades = await Actividad.findAll({ paranoid: false });
    if (actividades) {
      return res.status(200).json(actividades);
    } else {
      return res.status(404).send("Actividades no encontradas");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneActividad(req, res) {
  try {
    const actividad = await Actividad.findByPk(req.params.id);
    if (actividad) {
      return res.status(200).json(actividad);
    } else {
      return res.status(404).send("Actividad no encontrada");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createActividad(req, res) {
  try {
    const actividad = await Actividad.create(req.body);
    return res
      .status(200)
      .json({ message: "Actividad creada", actividad: actividad });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateActividad(req, res) {
  try {
    const [actividadExist, actividad] = await Actividad.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    if (actividadExist !== 0) {
      return res
        .status(200)
        .json({ message: "Actividad Actualizada", actividad: actividad });
    } else {
      return res.status(404).send("Actividad no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteActividad(req, res) {
  try {
    const actividad = await Actividad.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (actividad) {
      return res.status(200).json("Actividad Eliminada");
    } else {
      return res.status(404).send("Actividad no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllActividades,
  getOneActividad,
  createActividad,
  updateActividad,
  deleteActividad,
};
