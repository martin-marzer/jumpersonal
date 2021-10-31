const { validationResult } = require("express-validator")
const fs = require('fs');
const path = require("path")
const bcrypt = require('bcryptjs');

    
const db = require("../database/models")

const User = db.User

const controlador = {
    register: (req,res) => {
        res.render("register");
    },
    processRegister: (req,res) => {
        const resultValidation = validationResult(req);
        let encryptedPassword = bcrypt.hashSync(req.body.password, 10)
        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: encryptedPassword,
                rol: 2
            })
            .then(user => {
                req.session.userLogged = user;

                return res.redirect("/");
            })
            .catch(error => res.send(error))
        }
    },
    
    login: (req,res) => {
        res.render("login");
    },
    loginProcess: (req,res) => {
        const resultValidation = validationResult(req);
        User.findOne ({
            where: {
                email: req.body.email
            }
        })
        .then(userToLogin => {

            if(userToLogin) {
                let verifiquePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
             if (verifiquePassword){
                 delete userToLogin.password
                 req.session.userLogged = userToLogin;
                 if(req.body.recordame != undefined){
                     res.cookie('recordame',userToLogin.email,{maxAge: 1000 * 60 * 60 * 24})
                   }
                 return res.redirect("/profile")
             }
            }
                     
            return res.render("login", {
                errors: resultValidation.mapped(),
                errorsGeneral: {
                    msg:"Hubo un problema con su inicio de sesión"
                },
                oldData: req.body
            })
        })
    },
    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('recordame',null,{maxAge: -1});
        res.redirect('/')
      },

    profile: function (req, res) {
        res.render("profile", {
            user: req.session.userLogged
        });
    }
};

module.exports = controlador;