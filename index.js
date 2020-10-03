//server


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./helper/datasim');
const data = db.data;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', (req, res) => {
  //see all users
  res.json(data);
});

app.post('/users', (req, res) => {
  //create add user

  req.body.id = Math.floor(Date.now());

  data.users.push(req.body);
  console.log(data);
  res.send('Create!');
});
app.get('/users/:id', (req, res) => {
  //get user info by id
  console.log(req.params.id);
  res.send(db.getRow(req.params.id));
});

app.put('/users/:id', (req, res) => {
  //update user
  req.body.id = req.params.id;
  let temp = db.findID(data.users, req.params.id);
  if (temp != -1) {
    data.users[temp] = req.body;
    res.write('UPDATE!');

  } else {
    res.write('not found id:' + req.params.id);
  }
  console.log(data);
  res.send();
});

app.delete('/users/:id', (req, res) => {
  //delete user
  let id = db.findID(data.users, req.params.id); //dbに存在しないidは-1が返ってくる
  console.log(id);
  if (id != -1) {
    data.users.splice(id, 1);
    console.log(data);
    res.write('deleted ID :' + req.params.id);

  } else {
    res.write('not found id!');
  }

  res.send();
});

app.listen(3000);