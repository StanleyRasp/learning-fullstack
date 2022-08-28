const express = require('express');
const Joi = require('joi');
const errors = require("../misc/errors.js");

const router = express.Router();

let genres = [];

let curId = 1;

function validateGenreInput(input){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    })

    return schema.validate(input);
}

// get all genres in "database"
router.get("/", (req, res) => {
    res.send(genres);
})

// get a genre with a specific ID
router.get("/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        errors[404](
            res, 
            `A course with id ${req.params.id} does not exist.`
            );
        return;
    }
    res.send(genre);
})

// add a new genre to the database
router.post("/", (req, res) => {
    const { error: validationError } = validateGenreInput(req.body);

    if (validationError) {
        errors[400](
            res, 
            `An error was thrown. Error content:
            ${validationError}`
            );
        return;
    }

    const genre = {
        id: curId++,        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
})

router.put("/:id", (req, res) => {
    const index = genres.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        errors[404](
            res, 
            `A course with id ${req.params.id} does not exist.`
            );
        return;
    }

    const { error: validationError } = validateGenreInput(req.body);

    if (validationError) {
        errors[400](
            res, 
            `An error was thrown. Error content:
            ${validationError}`
            );
        return;
    }

    genres[index].name = req.body.name;

    res.send(genres[index]);
})

router.delete("/:id", (req, res) => {
    const index = genres.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        errors[404](
            res, 
            `A course with id ${req.params.id} does not exist.`
            );
        return;
    }

    res.send(genres[index]);
    genres.splice(index, 1);
})

module.exports = router;