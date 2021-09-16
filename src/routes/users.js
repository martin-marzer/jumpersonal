const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const fs = require("fs")
const path = require("path")
const usersFilePath = path.resolve(__dirname, '../database/users.json');

const { body } = require("express-validator")
const validations = [
    body("username")
    .notEmpty().withMessage("Nombre Invalido").bail()
    .isLength({min:3, max:10}).withMessage("Longitud: 3 a 10 Caracteres"),

    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isEmail().withMessage("Formato Invalido")
    .custom(function(value) {
        let usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let users;
        if (usersJSON == "") {
            users = []
        } else {
            users = usersJSON
        }
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.email == value) {
                return false
            }
        }
        return true
    }).withMessage("Datos Incorrectos"),

    body("password")
    .notEmpty().withMessage("Escribe Una Contraseña").bail()
    .isLength({min:4, max:15}).withMessage("Longitud: 4 a 15 Caracteres"),

    body("terminos")
    .notEmpty()
];

router.get("/register", usersController.register);

router.post("/register", validations, usersController.processRegister);

router.get("/login", usersController.login);



module.exports = router;