const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/User.js");

router.get("/login", (req, res) => {
  res.render("login", {
    message: {
      success: req.flash('msg_success'),
      error: req.flash('msg_error')
    }
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    message: {
      success: req.flash('msg_success'),
      error: req.flash('msg_error')
    }
  });
});

router.post("/user/register", (req, res) => {

  var email = req.body.email;
  var password = req.body.password;
  var nome = req.body.nome;

  // Check the data
  if(email != '' && password != '' && nome != '') {

    // Check if the user already exists
    User.findOne({
           where: {email: email}
       }).then(finduser => {
         if(finduser == undefined) {

           var salt = bcrypt.genSaltSync(10);
           var hash = bcrypt.hashSync(password, salt);
           User.create({
             nome: nome,
             email: email,
             password: hash
           }).then(user => {
             req.flash('msg_success', 'Cadastro feito com sucesso!');
             res.redirect("/login");
           }).catch(err => {
             req.flash('msg_error', 'Erro no cadastro');
             res.redirect("/register");
          });
         } else {
           req.flash('msg_error', 'Este e-mail já existe');
           res.redirect("/register");
         }
      });
  } else {
    req.flash('msg_error', 'Preencha corretamente os campos');
    res.redirect("/register");
  }

});

router.post("/user/login", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    req.session.company = undefined;

    // Check the data
    if(email != '' && password != '') {

      User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if(user != undefined) {
          var correct = bcrypt.compareSync(password, user.password);

          if(correct) {

            req.session.user = {
              id: user.id,
              email: user.email
            }
            req.flash('msg_success', 'Login feito com sucesso!');
            res.redirect("/");
          } else {
            req.flash('msg_error', 'E-mail e senha não correspondem');
            res.redirect("/login");
          }
        } else {
          req.flash('msg_error', 'E-mail inválido');
          res.redirect("/login");
        }
      })
    } else {
      req.flash('msg_error', 'Preencha corretamente os campos');
      res.redirect("/login");
    }
});

module.exports = router;
