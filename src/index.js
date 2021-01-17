const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());
let studentsArr = require("./InitialData.js");
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// your code goes here
console.log(studentsArr);
app.get("/api/student",(req,res)=>{
    res.send(studentsArr);
});

app.get("/api/student/:id",(req,res)=>{
    const student = studentsArr.find((currentStudent)=>currentStudent.id === parseInt(req.params.id)) || null;
    if (!student){
        res.sendStatus(404);
    }
    res.send(student);
    
})

let id = 7

app.post("/api/student",(req,res)=>{
    const name = req.body.name || null;
    const currentClass = parseInt(req.body.currentClass) || null;
    const division = req.body.division || null;
    if (!name || !currentClass || !division){
        res.sendStatus(400);
    }
    id++;
    const newStudent = {
        id: id,
        name:name,
        currentClass:currentClass,
        division: division
    }
    studentsArr.push(newStudent);
    res.send({"id":id});
})

app.put("/api/student/:id",(req,res)=>{
    const student = studentsArr.find((currentStudent)=>currentStudent.id === parseInt(req.params.id)) || null;
    if (!student){
        res.sendStatus(400);
    }
    const name = req.body.name || null;
    const currentClass = req.body.currentClass || null;
    const division = req.body.division || null;
    if (name){
        student.name = name;
    }
    if(currentClass){
        student.currentClass = currentClass;
    }
    if(division){
        student.division = division;
    }
    res.send(student);
})

app.delete("/api/student/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const currentLength = studentsArr.length;
    studentsArr = studentsArr.filter((currentStudent)=>{
        currentStudent.id !== id
    })

    if (currentLength > studentsArr.length){
        res.sendStatus(200);
    }
    res.sendStatus(404);
    
})




app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
