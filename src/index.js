const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());
let studentsArr = require("./InitialData.js");
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
    for (let i = 0; i < studentsArr.length; i++) {
      if (studentsArr[i].id == req.query.id) {
        res.send(JSON.stringify(studentsArr[i]));
        return;
      }
    }
  }
  res.sendStatus(404);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
