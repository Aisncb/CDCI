const Usuario = require('../api/models/usuario.model.js')
const Actividad = require('../api/models/actividad.model.js')
const Ruta = require('../api/models/ruta.model.js')
const Pago = require('../api/models/pago.model.js')
const Noticia = require('../api/models/noticia.model.js')


function addRelationsToModels() {
  try {

    // One to many
    Usuario.hasMany(Usuario)
    Ruta.hasMany(Actividad)
    Usuario.hasMany(Pago)
    Usuario.hasMany(Noticia)
    Usuario.hasMany(Ruta)

    // // Many to many
    Usuario.belongsToMany(Actividad, { through: "usuario_actividad" })
    Actividad.belongsToMany(Usuario, { through: "usuario_actividad" })

    console.log('Relations added to all models')
  } catch (error) {
    throw error
  }
}

module.exports = addRelationsToModels
