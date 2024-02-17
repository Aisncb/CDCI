const jwt = require('jsonwebtoken')
const Usuario= require('../models/usuario.model.js')

function checkAuth(req, res, next) { // Authentication process: We check if the user has logged in
    // and been given the required «token».
    if (!req.headers.authorization) return res.status(401).send('Token not found')  // Checking if 
    // the «token» has been sent via the request header.

    jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
        if (err) return res.status(401).send('Token not valid')

        const usuario = await Usuario.findOne({ where: { dni: result.dni } })
        if (!usuario) return res.status(401).send('User not found')

        res.locals.usuario = usuario

        next()
    })
}

function checkAdmin(req, res, next) { // Checking if the user has access or not to the resource 
    // they are requesting (they will be given access depending on their role):
    if (res.locals.usuario.rol !== 'administrador') {
        return res.status(401).send('Usuario no autorizado')
    } else {
        next()
    }
}

function getYesterdaysDate() {
  const date = new Date();
  let yesterdaysYear, yesterdaysMonth, yesterdaysDay;

  date.setDate(date.getDate() - 1);

  (yesterdaysYear = date.getFullYear()),
    (yesterdaysMonth = date.getMonth() + 1),
    (yesterdaysDay = date.getDate());

  return `${yesterdaysYear}-${yesterdaysMonth}-${yesterdaysDay}`;
}

function validatePassword(password) {
    // Our API will be only allowing passwords whose length equals to eight or more characters including, at least, 
    // one letter (either upper or lower case) and one number. It accepts any special character.
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;
    return regex.test(password);
  }

module.exports = {
  checkAuth,
  checkAdmin,
  getYesterdaysDate,
  validatePassword,
};
