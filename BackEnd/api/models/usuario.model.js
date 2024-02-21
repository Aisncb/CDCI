const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Usuario = sequelize.define(
  'usuarios',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING
    },
    fechaNacimiento: {
      type: DataTypes.DATE
    },
    direccion: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.INTEGER
    },
    telefonoEmergencia: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
    },
    sexo: {
      type: DataTypes.STRING,
    },
    nacionalidad: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fechaAlta: {
      type: DataTypes.DATE,
    },
    fechaBaja: {
      type: DataTypes.DATE,
    },
    causaBaja: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('senderista', 'gestor', 'administrador'),
      defaultValue: 'senderista'
    }
  },
  { timestamps: false }
)

module.exports = Usuario