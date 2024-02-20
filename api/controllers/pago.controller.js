const Pago = require("../models/pago.model.js");

async function getAllPagos(req, res) {
  try {
    const pagos = await Pago.findAll({ paranoid: false });
    if (pagos) {
      return res.status(200).json(pagos);
    } else {
      return res.status(404).send("Pagos no encontradas");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOnePago(req, res) {
  try {
    const pago = await Pago.findByPk(req.params.id);
    if (pago) {
      return res.status(200).json(pago);
    } else {
      return res.status(404).send("Pago no encontrada");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createPago(req, res) {
  try {
    const pago = await Pago.create(req.body);
    return res
      .status(200)
      .json({ message: "Pago creada", pago: pago });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updatePago(req, res) {
  try {
    const [pagoExist, pago] = await Pago.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    if (pagoExist !== 0) {
      return res
        .status(200)
        .json({ message: "Pago Actualizada", pago: pago });
    } else {
      return res.status(404).send("Pago no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deletePago(req, res) {
  try {
    const pago = await Pago.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (pago) {
      return res.status(200).json("Pago Eliminada");
    } else {
      return res.status(404).send("Pago no encontrada");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllPagos,
  getOnePago,
  createPago,
  updatePago,
  deletePago,
};
