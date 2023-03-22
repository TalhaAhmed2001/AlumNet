const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongodb');
const { connectSQL } = require("./config/dbConfig");

const generalRoutes = require("./routes/generalRouter");
const alumniRoutes = require("./routes/alumniRouter");
const storiesRoutes = require("./routes/storiesRouter");
const advicesRoutes = require("./routes/advicesRouter");
const adminRoutes = require('./routes/adminRouter');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000

connectMongo()  //mongo connect
connectSQL()    //sql connect


app.use("/api/general", generalRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/advices", advicesRoutes);
app.use("/api/login", adminRoutes)


app.listen(port, () => console.log(`\nServer running on port ${port}\n`))