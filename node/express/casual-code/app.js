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
let courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];

// environment related variables
const port = process.env.PORT || 3000;
const PID = process.pid;
const fileName = __filename.split("/").at(-1);

function validateCourseInput(input){
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
let curId = 4

// root displays information about the server
app.get("/", (req, res) => {
    res.send(`${fileName} is running (PID: ${PID}) on port: ${port}...`)
})

// get all courses in "database"
app.get("/api/courses", (req, res) => {
    res.send(courses);
})

// get a course with a specific ID
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        throw404(res, req.params.id);
        return;
    }
    res.send(course);
})

// add a new course to the database
app.post("/api/courses", (req, res) => {
    const { error: validationError } = validateCourseInput(req.body);

    if (validationError) {
        throw400(res, validationError);
        return;
    }

    const course = {
        id: curId++,        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

app.put("/api/courses/:id", (req, res) => {
    const index = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        throw404(res, req.params.id);
        return;
    }

    const { error: validationError } = validateCourseInput(req.body);

    if (validationError) {
        throw400(res, validationError);
        return;
    }

    courses[index].name = req.body.name;

    res.send(courses[index]);
})

app.delete("/api/courses/:id", (req, res) => {
    const index = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        throw404(res, req.params.id);
        return;
    }

    res.send(courses[index]);
    courses.splice(index, 1);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
