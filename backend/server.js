const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongodb');
const { connectSQL } = require("./config/dbConfig");

const alumniRouter = require("./routes/alumniRouter");
const storiesRouter = require("./routes/storiesRouter");
const advicesRouter = require("./routes/advicesRouter");
const adminRouter = require('./routes/adminRouter');
const studentRouter = require('./routes/studentRouter');
const loginRouter = require("./routes/loginRouter")

const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT || 5000

connectMongo()  //mongo connect
connectSQL()    //sql connect

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});

app.use("/login", loginRouter);
app.use("/alumni", alumniRouter);
app.use("/stories", storiesRouter);
app.use("/advices", advicesRouter);
app.use("/student", studentRouter);
app.use("/", adminRouter);


app.listen(port, () => console.log(`\nServer running on port ${port}\n`))
