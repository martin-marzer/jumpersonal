const fs = require('fs');
const path = require('path');



function authMiddleware (req, res, next) {
 if (req.session.userLogged != undefined) {
    res.locals.usuario = req.session.userLogged;
    usuario = res.locals.usuario
     next()
 } else {
     res.redirect("/login")
 }
}


module.exports = authMiddleware

//este middleware es para preguntar si estas logueado, si estas loggueado ya no vvas  apoder entrar en esas paginas