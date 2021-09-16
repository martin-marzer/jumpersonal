function authMiddleware (req, res, next) {
 if (req.session.usuarioLogueado != undefined) {
     next()
 } else {
     res.send("Crea una cuenta")
 }
}


module.exports = authMiddleware

//este middleware es para preguntar si estas logueado, si estas loggueado ya no vvas  apoder entrar en esas paginas