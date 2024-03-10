const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Ruta = sequelize.define(
  'ruta',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING
    },
    archivoRuta: {
      type: DataTypes.STRING
    },
    imagen: {
      type: DataTypes.STRING
    },
    nivel: {
      type: DataTypes.STRING
    },
    nota: {
      type: DataTypes.STRING
    } 
  },
  { timestamps: false }
)

module.exports = Ruta