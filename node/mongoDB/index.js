const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log("connected to mongoDB"))
    .catch(e => console.error("Could not connect to mongoDB", e));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema);

async function createCourse(obj){
    const course = new Course(obj);

    const result = await course.save();
    
    console.log(result);
}

createCourse({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
});