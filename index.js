// Models Loading
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const userController = require("./controller/User.js");
const companyController = require("./controller/Company.js");
const demandaController = require("./controller/Demanda.js");
const Company = require("./model/Company");
const Demanda = require("./model/Demanda");
const User = require("./model/User");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Configurations

// Sessions
  app.use(cookieParser());
  app.use(session({
      secret: "hQn2HOIyw$cl",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30000000 }
  }));
  app.use(flash());

  // View engine
  app.set('view engine', 'ejs');

  // Static
  app.use(express.static('public'));

  // Body-parser
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  // Router sets
  app.use("/", userController);
  app.use("/", companyController);
  app.use("/", demandaController);

  // Database
  connection
    .authenticate()
    .then(() => {
      console.log("Conexão com banco feita com sucesso!");
    })
    .catch((errorMsg) => {
      console.log(errorMsg);
    });

//Routes
  app.get("/", (req,res) => {

    res.render("index", {
      message: {
        success: req.flash('msg_success'),
        error: req.flash('msg_error')
      }
    });

  });

app.listen(3000, () => {console.log("Server started in port: 3000");});
