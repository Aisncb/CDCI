const router = require('express').Router()

const { getAllActividades, getOneActividad, createActividad, updateActividad, deleteActividad } = require('../controllers/actividad.controller.js')
const { checkAuth, checkAdmin } = require('../middleware/index.js')

// router.get('/', checkAuth, checkAdmin, getAllClassrooms)
router.get('/', checkAuth, getAllActividades)
router.get('/:id', checkAuth, checkAdmin, getOneActividad)
router.post('/', checkAuth, checkAdmin, createActividad)
router.put('/:id', checkAuth, checkAdmin, updateActividad)
router.delete('/:id', checkAuth, checkAdmin, deleteActividad)

module.exports = router