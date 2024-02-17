const Usuario = require("../models/usuario.model.js"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  { validatePassword } = require("../controllers/auth.controller.js");

async function getAllUsers(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      // Filtering with the «where» clause in case query
      // params are passed as arguments.
      where: req.query,
      paranoid: false,
    });
    if (usuarios) {
      return res.status(200).json({ usuarios: usuarios });
    } else {
      return res.status(404).send("No usuarios found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneUser(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      return res.status(200).json({ usuario: usuario });
    } else {
      return res.status(404).send("Usuario no encontrado.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getProfile(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id);
    if (!usuario) {
      res.status(404).send("Usuario no encontrado.");
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createUser(req, res) {
  try {
    const usuario = await Usuario.create(req.body);
    return res
      .status(200)
      .json({ message: "¡Usuario creado correctamente!", user: user });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateUser(req, res) {
  try {
    // Before trying to update the user, we have to
    // check in the database if he/she exists:
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      const [userUpdated] = await Usuario.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (userUpdated !== 0) {
        // If we tried to use the variable «user.dataValues» here,
        // we would not get the updated values for the user being processed
        // but their former data:
        return res.status(200).send("¡Usuario actualizado!");
      } else {
        // Here, however, we can use the variable as their data has not changed:
        return res.status(500).json({
          message:
            "El usuario no se puede actualizar. +Info: ¡Él/Ella ya tiene esos valores!",
          usuario: usuario,
        });
      }
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updateProfile(req, res) {
  try {
    // Before trying to update the user, we have to
    // check in the database if he/she exists:
    const usuario = await Usuario.findByPk(res.locals.usuario.id);
    if (usuario) {
      if (req.body.rol !== undefined) {
        return res
          .status(500)
          .send("Usted no puede modoficar el rol. +Info: Contacta con el administrador.");
      } else {
        const [userUpdated] = await Usuario.update(req.body, {
          where: {
            id: res.locals.usuario.id,
          },
        });
        if (userUpdated !== 0) {
          // If we tried to use the variable «user.dataValues» here,
          // we would not get the updated values for the user being processed
          // but their former data:
          return res.status(200).send("Usuario Actualizado!");
        } else {
          // Here, however, we can use the variable as their data has not changed:
          return res.status(500).json({
            message:
              "El usuario no se puede actualizar. +Info: ¡Usted ya tiene esos valores!!",
            usuario: usuario,
          });
        }
      }
    } else {
      return res.status(404).send("Usuario no encontrado.");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updatePassword(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id);
    if (usuario) {
      // First of all, password validation:
      if (validatePassword(req.body.password)) {
        // compareSync function will be checking if the password the user passes
        // in the body request (decrypted) equals the password the user has stored
        // in the database (encrypted):
        if (bcrypt.compareSync(req.body.password, usuario.password)) {
          // After the process, if they are equal, the following message will be displayed:
          return res.status(500).json({
            message:
              "La contraseña no se pueda actualizar. +Info: Usted ya tiene esta contraseña!",
            usuario: usuario,
          });
        } else {
          // However, if they are different, the decrypted password will be encrypted and
          // then stored in the corresponding password key of the body section:
          const saltRounds = bcrypt.genSaltSync(
              parseInt(process.env.SALTROUNDS)
            ),
            hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          req.body.password = hashedPassword;
          const payload = { email: res.locals.usuario.email },
            token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" }),
            [passwordUpdated] = await Usuario.update(req.body, {
              where: {
                id: res.locals.usuario.id,
              },
            });

          if (passwordUpdated !== 0) {
            return res.status(200).json({
              message: "Su contraseña se ha actualizado!",
              token: token,
            });
          } else {
            return res.status(500).json({
              message:
                "La contraseña no se ha podido actualizar. +Info: Usted tiene esta contraseña!",
              usuario: usuario,
            });
          }
        }
      } else {
        return res
          .status(500)
          .send(
            "Contraseña no validad. +Info: Las contraseñas deben tener una longitud igual a ocho o más caracteres incluyendo, al menos, una letra (ya sea mayúscula o minúscula) y un número.."
          );
      }
    } else {
      return res.status(404).send("Usuario no encontrado.");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const usuario = await Usuario.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (usuario) {
      return res
        .status(200)
        .json({ message: "Usuario eliminado!", user: user });
    } else {
      return res.status(404).send("Usuario no encontrado.");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  getProfile,
  createUser,
  updateUser,
  updateProfile,
  updatePassword,
  deleteUser,
};