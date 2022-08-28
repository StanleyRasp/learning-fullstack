// dependancies
const express = require("express");
const process = require("process");
const genresRouter = require('./routes/genres');
const homeRouter = require("./routes/home");

// express app object
const app = express();

// middleware
app.use(express.json());
app.use("/api/genres", genresRouter);
app.use("/", homeRouter);

// environment related variables
const port = process.env.PORT || 3000;
const PID = process.pid;
const fileName = __filename.split("/").at(-1);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})