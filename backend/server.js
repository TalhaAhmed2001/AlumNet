const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongodb');
const { connectSQL } = require("./config/dbConfig");

const alumniRouter = require("./Router/alumniRouter");
const storiesRouter = require("./Router/storiesRouter");
const advicesRouter = require("./Router/advicesRouter");
const adminRouter = require('./Router/adminRouter');
const studentRouter = require('./Router/studentRouter');
const loginRouter = require("./Router/loginRouter")

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000

connectMongo()  //mongo connect
connectSQL()    //sql connect


app.use("/login",loginRouter);
app.use("/admin", adminRouter);
app.use("/alumni", alumniRouter);
app.use("/stories", storiesRouter);
app.use("/advices", advicesRouter);
app.use("/student",studentRouter);


app.listen(port, () => console.log(`\nServer running on port ${port}\n`))