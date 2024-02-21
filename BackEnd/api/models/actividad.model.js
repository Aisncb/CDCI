const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Actividad = sequelize.define(
  'actividad',
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING
    },
    fecha: {
      type: DataTypes.DATE
    },
    plazas: {
      type: DataTypes.INTEGER
    },
    precio: {
      type: DataTypes.DOUBLE
    },
    coste: {
      type: DataTypes.DOUBLE
    }
  },
  { timestamps: false }
)

module.exports = Actividad