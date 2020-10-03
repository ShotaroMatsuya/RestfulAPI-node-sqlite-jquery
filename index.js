//server


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('testdb', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', (req, res) => {
  //see all users
  db.all('SELECT * FROM users ', function (err, rows) {
    res.json(rows);
  });

});

app.post('/users', (req, res) => {
  //create add user

  db.run(`INSERT INTO users (name,pass) VALUES('${req.body.name}','${req.body.pass}')`, function (err) {
    console.log(err);
    res.json({
      id: this.lastID
    });
  });

});
app.get('/users/:id', (req, res) => {
  //get user info by id
  console.log(req.params.id);
  db.run("SELECT * FROM users WHERE id = " + req.params.id, function (err) {
    console.log(err);
    res.json({
      rows
    });
  });
});

app.put('/users/:id', (req, res) => {
  //update user
  db.run(`UPDATE users SET name="${req.body.name}", pass="${req.body.pass}" WHERE id = ${req.params.id}`, function (err) {
    console.log(err);
    res.json({
      status: this.changes
    });
  });

});

app.delete('/users/:id', (req, res) => {
  //delete user
  db.run(`DELETE FROM users  WHERE id = ${req.params.id}`, function (err) {
    console.log(err);
    res.json({
      status: this.changes
    });
  });
});

app.listen(3000);