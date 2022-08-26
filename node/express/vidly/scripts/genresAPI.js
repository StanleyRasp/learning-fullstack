// dependancies
const { response } = require("express");
const express = require("express");
const req = require("express/lib/request");
const Joi = require("joi");
const process = require("process");
const app = express();

// express app object
app.use(express.json());

// pseudo database
let genres = [];

// environment related variables
const port = process.env.PORT || 3000;
const PID = process.pid;
const fileName = __filename.split("/").at(-1);

function validateGenreInput(input){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    })

    return schema.validate(input);
}

function throw400(response, error){
    response.status(400).send(
        `An error was thrown. Error content:
        ${error}`);
}

function throw404(response, id){
    response.status(404).send(`A course with id ${id} does not exist.`);
}

// HTML request handling
let curId = 1;

// root displays information about the server
app.get("/", (req, res) => {
    res.send(`${fileName} is running (PID: ${PID}) on port: ${port}...`)
})

// get all genres in "database"
app.get("/api/genres", (req, res) => {
    res.send(genres);
})

// get a genre with a specific ID
app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        throw404(res, req.params.id);
        return;
    }
    res.send(genre);
})

// add a new genre to the database
app.post("/api/genres", (req, res) => {
    const { error: validationError } = validateGenreInput(req.body);

    if (validationError) {
        throw400(res, validationError);
        return;
    }

    const genre = {
        id: curId++,        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
})

app.put("/api/genres/:id", (req, res) => {
    const index = genres.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        throw404(res, req.params.id);
        return;
    }

    const { error: validationError } = validateGenreInput(req.body);

    if (validationError) {
        throw400(res, validationError);
        return;
    }

    genres[index].name = req.body.name;

    res.send(genres[index]);
})

app.delete("/api/genres/:id", (req, res) => {
    const index = genres.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        throw404(res, req.params.id);
        return;
    }

    res.send(genres[index]);
    genres.splice(index, 1);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})