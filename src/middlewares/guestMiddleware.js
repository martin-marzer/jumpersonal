function guestMiddleware (req, res, next) {
    if (req.session.userLogged == undefined) {
        next()
    } else {
        res.redirect("/profile")
    }
}
   
   
   module.exports = guestMiddleware

   //aca pregunto si no estoy logueado, aca te deja acceder a rutas simples (ya q es cuando no tenes cuentas)