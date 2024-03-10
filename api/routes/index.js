const router = require('express').Router();

router.use('/auth', require('./auth.router.js'))
router.use('/pago', require('./pago.router.js'));
router.use('/noticia', require('./noticia.router.js'));
router.use('/actividad', require('./actividad.router.js'));
router.use('/ruta', require('./ruta.router.js'));
router.use('/usuario', require('./usuario.router.js'));


module.exports = router;