const { validationResult } = require("express-validator")
const fs = require('fs');
const path = require("path")
const bcrypt = require('bcryptjs');
const usersFilePath = path.resolve(__dirname, '../database/users.json');

const controlador = {
    register: (req,res) => {
        res.render("register");
    },
    processRegister: (req,res) => {
        const resultValidation = validationResult(req);
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        
        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        else {
            let infoUser = req.body
            let lastID = users[users.length -1].id;

            let newUser = {
                id: lastID + 1,
                username: infoUser.username,
                email: infoUser.email,
                password: bcrypt.hashSync(infoUser.password, 10),
                category: "user"
            }
            let newJSON = users.concat(newUser);
            let userJSON = JSON.stringify(newJSON, null, 2);

            fs.writeFileSync( usersFilePath, userJSON);
            res.redirect("/login")
        }
    },
    login: (req,res) => {
        res.render("login");
    }

};

module.exports = controlador;