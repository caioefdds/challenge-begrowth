function CompanyAuth(req, res, next) {
    if(req.session.company != undefined) {
        next();
    } else {
        res.redirect("/company-login");
    }
}

module.exports = CompanyAuth;
