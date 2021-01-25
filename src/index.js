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

app.put("/api/student/:id", (req,res)=>{

    const studentId = req.params.id;

    const student = studentArray.find(el => el.id === parseInt(studentId));
    

    if(!student){
        res.status(400).send();
        return;
    }
    else if(req.body.name){
        if(req.body.name.length === 0){
            res.status(400).send();
            return; 
        }
    }
    else if(req.body.currentClass){
        if(!Number.isInteger(req.body.currentClass)){
            res.status(400).send();
            return; 
        }
    }
    else if(req.body.division){
        if(!req.body.division.length === 1 || !req.body.division.match(/[A-Z]/)){
            res.status(400).send();
            return; 
        }
    }

    const studentIndex = studentArray.findIndex((el) => el.id === parseInt(studentId));

    const newStudent= {
        id: studentId,
        ...student,
        ...req.body
    }

    let classStudent = Number(newStudent.currentClass); 

    newStudent.currentClass = classStudent;

    studentArray.splice(studentIndex, 1, newStudent);

    //res.setHeader(['{"content-type":"application/x-www-form-urlencoded"}']);
    res.send(newStudent.name);

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
