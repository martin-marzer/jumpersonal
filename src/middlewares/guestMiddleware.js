function guestMiddleware (req, res, next) {
    if (req.session.usuarioLogueado == undefined) {
        next()
    } else {
        res.send("Acceso denegado, ya tenes una cuenta")
    }
   }
   
   
   module.exports = guestMiddleware

   //aca pregunto si no estoy logueado, aca te deja acceder a rutas simples (ya q es cuando no tenes cuentas)