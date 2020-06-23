const express = require("express");
const router = express.Router();
const Demanda = require("../model/Demanda.js");
const Company = require("../model/Company.js");
const User = require("../model/User.js");
const CompanyAuth = require("../middlewares/companyauth");
const Auth = require("../middlewares/authentication");

router.get("/demanda", Auth, (req, res) => {

  var session = {};
  if(req.session.user != undefined) {
    session.id = req.session.user.id;
    session.type = 'user';
  } else {
    session.id = req.session.company.id;
    session.type = 'company';
  }

  Demanda.findAndCountAll({
        include: [{model: Company},
          {model: User}],
        order: [
          ['status', 'ASC']
        ]
    }).then(demanda => {
    res.render("demanda", {
      demanda: demanda,
      session: session,
      message: {
        success: req.flash('msg_success'),
        error: req.flash('msg_error')
      }
    });
  })
});

router.get("/demanda/new", CompanyAuth, (req, res) => {
  var session = req.session.company;

  res.render("new-demanda", {
    session: session,
    message: {
      success: req.flash('msg_success'),
      error: req.flash('msg_error')
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.company = undefined;
  req.session.user = undefined;

  res.redirect("/");
})

router.get("/demanda/list", CompanyAuth, (req, res) => {

  var id = req.session.company.id;
  var session = {};
  session.type = "company";

  Demanda.findAndCountAll({
        include: [{
          model: Company,
          where: {id: id}
        },{
          model: User
        }]
    }).then(demanda => {
    res.render("list-demanda", {
      demanda: demanda,
      session: session,
      message: {
        success: req.flash('msg_success'),
        error: req.flash('msg_error')
      }
    });
  })
});

router.post("/demanda/edit", (req, res) => {
  var id = req.body.id;

  Demanda.findOne({
    where: {
      id: id
    }
  }).then(demanda => {
    res.render("edit-demanda", {
      demanda: demanda
    })
  }).catch(err => {
    res.redirect("/demanda/list");
  })
});

router.post("/demanda/edit/confirm", (req, res) => {
  var id = req.body.id;
  var descricao = req.body.descricao;
  var data_validade = req.body.data_validade;
  var local_entrega = req.body.local_entrega;
  var datenow = req.body.datenow;

  if(descricao != '' && data_validade != '' && local_entrega != '') {
    if(datenow <= data_validade) {
      Demanda.update({
        descricao: descricao,
        data_validade: data_validade,
        local_entrega: local_entrega,
        status: 0,
        id_entregador: null
      },{
        where: {
          id: id
        }
      }).then(() => {
        req.flash('msg_success', 'Sucesso!');
        res.redirect("/demanda");
      }).catch( err => {
        req.flash('msg_error', 'Falha');
        res.redirect("/demanda/new");
      });
    } else {
      req.flash('msg_error', 'A data de validade deve ser maior que a data atual.');
      res.redirect("/demanda/list");
    }
  } else {
    req.flash('msg_error', 'Preencha corretamente os campos');
    res.redirect("/demanda/list");
  }
});

router.post("/demanda/delete", (req, res) => {

  var id = req.body.id;

    Demanda.destroy({
        where: {
          id: id
        }
      }).then(() => {
          req.flash('msg_success', 'Demanda excluída!');
          res.redirect("/demanda/list");
      }).catch( err => {
          req.flash('msg_error', 'Falha!');
          res.redirect("/demanda/list");
      });
});

router.post("/demanda/create", CompanyAuth, (req, res) =>{

  var descricao = req.body.descricao;
  var data_validade = req.body.data_validade;
  var local_entrega = req.body.local_entrega;
  var tabCompanyId = req.body.tabCompanyId;
  var datenow = req.body.datenow;

  if(descricao != '' && data_validade != '' && local_entrega != '' && tabCompanyId != '') {
    if(datenow <= data_validade) {
      Demanda.create({
        tabCompanyId: tabCompanyId,
        descricao: descricao,
        data_validade: data_validade,
        local_entrega: local_entrega,
        status: 0
      }).then(() => {
        req.flash('msg_success', 'Sucesso!');
        res.redirect("/demanda");
      }).catch(err => {
        req.flash('msg_error', 'Falha');
        res.redirect("/demanda/new");
      });
    } else {
      req.flash('msg_error', 'A data de validade deve ser maior que a data atual.');
      res.redirect("/demanda/new");
    }
  } else {
    req.flash('msg_error', 'Preencha corretamente os campos');
    res.redirect("/demanda/new");
  }
});

router.post("/user/withdraw-product", (req, res) => {

  var id = req.body.id;
  var id_entregador = req.session.user.id;

  Demanda.update({
    id_entregador: null
  },{
    where: {
      id: id
    }
  }).then(() => {
        res.redirect("/demanda");
    }).catch( err => {
        res.redirect("/index");
    })
});

router.post("/user/get-product", (req, res) => {

  var id = req.body.id;
  var id_entregador = req.session.user.id;

  Demanda.update({
    id_entregador: id_entregador
  },{
    where: {
      id: id
    }
  }).then(() => {
        res.redirect("/demanda");
    }).catch( err => {
        res.redirect("/index");
    })
});

router.post("/user/finish", (req, res) => {

  var id = req.body.id;

  Demanda.update({
    status: 1
  },{
    where: {
      id: id
    }
  }).then(() => {
        res.redirect("/demanda");
    }).catch( err => {
        res.redirect("/index");
    })
});



module.exports = router;
