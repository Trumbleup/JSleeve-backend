
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const nodemailer = require("nodemailer");
const Client = require("shopify-buy");

const signin = require("./controllers/signin");
const register = require('./controllers/register');
const newsletter = require('./controllers/newsletter');
const send_demo = require('./controllers/send_demo');

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'jsleeve'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.post("/signin", (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});
app.post("/newsletter", (req, res) => {newsletter.handleNewsletter(req, res, db)});
app.post('/send_demo', (req, res) => {send_demo.handleSendDemo(req, res, nodemailer)});

app.listen(3000, () => console.log("Listening on port 3000"));