function Auth(req, res, next) {
    if(req.session.company != undefined || req.session.user != undefined) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = Auth;
