const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json()); //req.body

const listsRouter = require('./routes/lists.router');

app.use('/api/lists', listsRouter);

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});
