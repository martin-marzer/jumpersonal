const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");


let db = require("../database/models");
const User = db.User;

const { body } = require("express-validator")

const validationsRegister = [
    body("username")
    .notEmpty().withMessage("Escribe un Nombre").bail()
    .isLength({min:5, max:30}).withMessage("Longitud: 5 a 30 Caracteres").bail()
    .custom( async value => {
        let userCheck = await User.findOne({
            where: {
                username: value
            }
        })
        if (userCheck !== null) {

            return Promise.reject();
        } 
        return true
    }).withMessage(`Nombre de usuario en uso`),

    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isEmail().withMessage("Formato Invalido").bail()
    .custom( async value => {
        let emailCheck = await User.findOne({
            where: {
                email: value
            }
        })
        if (emailCheck !== null) {
            return Promise.reject();
        } 
        return true
    }).withMessage("Email invalido"),

    body("password")
    .notEmpty().withMessage("Escribe Una Contraseña").bail()
    .isLength({min:8, max:20}).withMessage("Longitud minima: 8 Caracteres").bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{4,}$/, "i").withMessage("Minimo: una mayúscula, una minúscula, un número y un caracter especial"),
    
    body("terminos")
    .notEmpty()
];

const validationsLogin = [
    body("username")
    .notEmpty().withMessage("Escribe un Nombre"),

    body("email")
    .notEmpty().withMessage("Escribe el email").bail()
    .isEmail().withMessage("Formato Invalido"),

    body("password")
    .notEmpty().withMessage("Escribe Una Contraseña")
]

router.get("/register", guestMiddleware, usersController.register);

router.post("/register", validationsRegister, usersController.processRegister);

router.get("/login", guestMiddleware, usersController.login);

router.post("/login", validationsLogin, usersController.loginProcess);

router.get('/logout', usersController.logout);

router.get("/profile", authMiddleware, usersController.profile);



module.exports = router;