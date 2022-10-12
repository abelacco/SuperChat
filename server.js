const express = require("express");
const bodyParser = require("body-parser")
const morgan = require('morgan');
require("dotenv").config();
const db = require("./db")

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

db(uri)

const router = require("./network/routes")

var app = express()
app.use(bodyParser.json())
app.use(morgan('dev'));

router(app)



app.use("/app", express.static("public"));

app.listen(3000);
console.log("La aplicacion esta escuchando en http://localhost:3000");