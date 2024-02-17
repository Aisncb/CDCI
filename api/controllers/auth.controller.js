const Usuario = require("../models/usuario.model.js"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  { validatePassword } = require("../middleware/index.js");

async function login(req, res) {
  try {
    const usuario = await Usuario.findOne({
      where: {
        dni: req.body.dni,
      },
    });

    if (!usuario)
      return res.status(404).send("Error: DNI o Contraseña incorrecta"); // Error in case we don't find the email
    const comparePass = bcrypt.compareSync(req.body.password, usuario.password); // comparamos la contraseña enviada sin encriptar con la encriptada en la base de datos

    if (comparePass) {
      const payload = { dni: usuario.dni }; // información que incluimos en el token
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" }); // generamos el token
      return res.status(200).send({ token: token, role: usuario.rol });
    } else {
      return res.status(404).json("Error: DNI o Contraseña incorrecta");
    }
  } catch (error) {
    console.log(req.body)
    return res.status(500).send(error.message);
  }
}

async function signup(req, res) {
  try {
    if (!validatePassword(req.body.password)) {
      return res
        .status(400)
        .send(
          "Password not valid. +Info: It must contain, at least, eight characters including a number and a letter (special characters are permitted)."
        );
    } else {
      const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      req.body.password = hashedPassword;

      const usuario = await Usuario.create(req.body);
      const payload = { dni: usuario.dni };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
      return res.status(200).json({
        message: "User successfully created!",
        usuario: usuario,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
      msg: "Se ha producido un error al procesar su petición. +Info: Esto puede deberse a que el dni proporcionado ya exista en la base de datos, o por otra razón desconocida.",
    });
  }
}

module.exports = { signup, login, validatePassword };
