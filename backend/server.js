const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongodb');
const { connectSQL } = require("./config/dbConfig");

const generalRoutes = require("./routes/general-routes");
const alumniRoutes = require("./routes/alumni-routes");
const storiesRoutes = require("./routes/stories-routes");
const advicesRoutes = require("./routes/advices-routes");
const adminRoutes = require('./routes/admin-routes');

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