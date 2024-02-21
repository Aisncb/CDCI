const router = require('express').Router()

const { getAllPagos, getOnePago, createPago, updatePago, deletePago } = require('../controllers/pago.controller.js')
const { checkAuth, checkAdmin } = require('../middleware/index.js')

router.get('/', checkAuth, getAllPagos)
router.get('/:id', checkAuth, checkAdmin, getOnePago)
router.post('/', checkAuth, checkAdmin, createPago)
router.put('/:id', checkAuth, checkAdmin, updatePago)
router.delete('/:id', checkAuth, checkAdmin, deletePago)

module.exports = router