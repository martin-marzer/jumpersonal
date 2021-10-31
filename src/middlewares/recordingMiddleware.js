const db = require("../database/models")
const User = db.User

function recordingMiddleware (req, res, next){

    let emailInCookie = req.cookies.recordame

    if (emailInCookie != undefined) {
        User.findOne ({
            where: {
                email: emailInCookie
            }
        })
        .then(UserFromCookie => {
            req.session.userLogged = UserFromCookie;
            res.locals.usuario = req.session.userLogged;
            next();
        })


    } else {
        next();
    }
}

module.exports = recordingMiddleware;
