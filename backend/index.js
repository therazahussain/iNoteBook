// es6hint line-disable
const express = require('express');
const connectToMongoose = require('./db.js');
const cors = require('cors');

// port Number
const port = "5000";
// Connect database to Mongoose
connectToMongoose();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Available Routes
app.use("/api/auth",require('./routes/auth'));
app.use("/api/notes",require('./routes/notes'));

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port,()=>{
    console.log("Inotebook backend Server Listening on port http://localhost:"+port)
})