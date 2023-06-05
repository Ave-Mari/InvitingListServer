const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


const listsRouter = require('./routes/lists.router');

app.use('/api/lists', listsRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});
