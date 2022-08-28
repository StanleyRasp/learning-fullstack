const express = require("express")

const router = express.Router();

// environment related variables
const port = process.env.PORT || 3000;
const PID = process.pid;
const fileName = __filename.split("/").at(-1);

// root displays information about the server
router.get("/", (req, res) => {
    res.send(`${fileName} is running (PID: ${PID}) on port: ${port}...`)
})

module.exports = router;