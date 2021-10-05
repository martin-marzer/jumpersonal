function adminMiddleware (req, res, next) {
    if (req.session.userLogged != undefined && req.session.userLogged.category == "admin") {
        next()
    } else {
        res.redirect("/profile")
    }
}

module.exports = adminMiddleware