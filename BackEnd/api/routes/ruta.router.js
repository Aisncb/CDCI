const router = require('express').Router()

const { getAllRutas, getOneRuta, createRuta, updateRuta, deleteRuta } = require('../controllers/ruta.controller.js')
const { checkAuth, checkAdmin } = require('../middleware/index.js')

router.get('/', checkAuth, getAllRutas)
router.get('/:id', checkAuth, checkAdmin, getOneRuta)
router.post('/', checkAuth, checkAdmin, createRuta)
router.put('/:id', checkAuth, checkAdmin, updateRuta)
router.delete('/:id', checkAuth, checkAdmin, deleteRuta)

module.exports = router