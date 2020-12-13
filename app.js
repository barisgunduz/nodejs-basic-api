const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
// load env values
const dotenv = require("dotenv");
dotenv.config();



// db
// MONGO_URI=mongodb://localhost/nodeapi
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Connected")
})

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err.message}`)
})

// bring routes
const postRoutes = require("./routes/post");

// middleware
app.use(morgan('dev'));
app.use("/", postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`A node js api is listening on port: ${port}`) });