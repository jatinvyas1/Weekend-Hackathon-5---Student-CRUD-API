const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());
let studentsArr = require("./InitialData.js");
let idCurr = studentsArr.length;
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
console.log(studentsArr);
app.get("/api/student", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.json(studentsArr);
  } else {
    const toReturn = studentsArr.find((student) => student.id == req.query.id);
    res.json(toReturn);
  }
  res.sendStatus(404);
});

app.post("/api/student", (req, res) => {
  const newStudent = req.body;
  console.log(newStudent);
  if (!newStudent.name || !newStudent.currentClass || !newStudent.division) {
    res.sendStatus(400);
    return;
  }
  idCurr++;
  studentsArr.push({
    id: idCurr,
    ...newStudent,
    currentClass: parseInt(newStudent.currentClass)
  });
  console.log(studentsArr);
  res.json({
    id: `${idCurr}`
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
