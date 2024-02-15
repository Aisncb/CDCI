const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Pago = sequelize.define(
  'pago',
  {
    fecha: {
      type: DataTypes.DATE
    },
    tipo: {
      type: DataTypes.STRING
    },
    concepto: {
      type: DataTypes.STRING
    },
    importe: {
      type: DataTypes.DOUBLE
    },
    estado: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
)

module.exports = Pago