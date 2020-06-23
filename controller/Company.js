const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/User.js");
const Company = require("../model/Company.js");

router.get("/company-login", (req, res) => {
  res.render("company-login", {
    message: {
      success: req.flash('msg_success'),
      error: req.flash('msg_error')
    }
  });
});

router.get("/company-register", (req, res) => {
  res.render("company-register", {
    message: {
      success: req.flash('msg_success'),
      error: req.flash('msg_error')
    }
  });
});

router.post("/company/register", (req, res) => {

  var descricao = req.body.descricao;
  var email = req.body.email;
  var password = req.body.password;

  // Check the data
  if(email != '' && password != '' && descricao != '') {

    // Check if the user already exists
    Company.findOne({
           where: {email: email}
       }).then(findcompany => {
         if(findcompany == undefined) {

           var salt = bcrypt.genSaltSync(10);
           var hash = bcrypt.hashSync(password, salt);
           Company.create({
             descricao: descricao,
             email: email,
             password: hash
           }).then(company => {
             req.flash('msg_success', 'Cadastro feito com sucesso!');
             res.redirect("/company-login");
           }).catch(err => {
             req.flash('msg_error', 'Erro no cadastro');
             res.redirect("/company-register");
          });
         } else {
           req.flash('msg_error', 'Este e-mail já existe');
           res.redirect("/company-register");
         }
      });
  } else {
    req.flash('msg_error', 'Preencha corretamente os campos');
    res.redirect("/company-register");
  }
});

router.post("/company/login", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    req.session.user = undefined;

    // Check the data
    if(email != '' && password != '') {

      Company.findOne({
        where: {
          email: email
        }
      }).then(company => {
        if(company != undefined) {
          var correct = bcrypt.compareSync(password, company.password);
          id = company.id.toString();

          if(correct) {
            req.session.company = {
              id: id,
              descricao: company.descricao,
              email: company.email
            }
            req.flash('msg_success', 'Login feito com sucesso!');
            res.redirect("/");
          } else {
            req.flash('msg_error', 'E-mail e senha não correspondem');
            res.redirect("/company-login");
          }
        } else {
          req.flash('msg_error', 'E-mail inválido');
          res.redirect("/company-login");
        }
      })
    } else {
      req.flash('msg_error', 'Preencha corretamente os campos');
      res.redirect("/company-login");
    }
});

module.exports = router;
