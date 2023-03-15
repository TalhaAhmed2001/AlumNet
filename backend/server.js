const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongodb');
const { config,pool } = require("./config/dbConfig");
const {createAlumnusProfile, deleteAlumnusProfile, getAlumnusProfile} = require('./controllers/alumnusController');
const {getStudentProfile} = require("./controllers/studentController")

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000

connectMongo()  //mongo connect

pool.connect()
    .then(()=>{
        console.log('SQL Server connection established successfully');
        getStudentProfile()
        //app.get("/:id", getAlumnusProfile)
        //app.use("/",)
    })
    .catch(err => console.log(`Database connection error: ${err}`))

app.listen(port, () => console.log(`\nServer running on port ${port}\n`))