const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongodb');
const { connectSQL } = require("./config/dbConfig");
const {createAlumnusProfile, deleteAlumnusProfile, getAlumnusProfile} = require('./controllers/alumnusController');
const {createStudentProfile} = require("./controllers/studentController")

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000

connectMongo()  //mongo connect
connectSQL()    //sql connect

app.get("/create", createStudentProfile)
app.get("/createAlumnus",createAlumnusProfile)

app.listen(port, () => console.log(`\nServer running on port ${port}\n`))