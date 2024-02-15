const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Noticia = sequelize.define(
  'noticia',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING
    },
    archico: {
      type: DataTypes.STRING
    },
    imagen: {
      type: DataTypes.STRING
    },
    fecha: {
      type: DataTypes.DATE
    },
    url: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false }
)

module.exports = Noticia