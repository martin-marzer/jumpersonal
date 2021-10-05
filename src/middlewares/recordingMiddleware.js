const User = require("../database/models/User");

function recordingMiddleware (req, res, next){

    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.recordame
    let UserFromCookie = User.findByField("email", emailInCookie);

    if(UserFromCookie){
        req.session.userLogged = UserFromCookie;
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    //console.log(UserFromCookie)

    next();
}

module.exports = recordingMiddleware;