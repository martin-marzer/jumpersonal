function softAuthMiddleware (req, res, next) {
    if (req.session.userLogged != undefined) {
       res.locals.usuario = req.session.userLogged;
        next()
    } else {
        next()
    }
}
    module.exports = softAuthMiddleware   


    // el otro es cuando quiero denegar si no lo esta, aca solo quiero guardar info de q esta logueado