const router = require('express').Router()

const { getAllNoticias, getOneNoticia, createNoticia, updateNoticia, deleteNoticia } = require('../controllers/noticia.controller.js')
const { checkAuth, checkAdmin } = require('../middleware/index.js')

// router.get('/', checkAuth, checkAdmin, getAllClassrooms)
router.get('/', checkAuth, getAllNoticias)
router.get('/:id', checkAuth, checkAdmin, getOneNoticia)
router.post('/', checkAuth, checkAdmin, createNoticia)
router.put('/:id', checkAuth, checkAdmin, updateNoticia)
router.delete('/:id', checkAuth, checkAdmin, deleteNoticia)

module.exports = router