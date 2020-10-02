//server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = {
  "users": [{
      "user": "admin",
      "pass": "password",
      "id": 1,
    },
    {
      "user": "admin1",
      "pass": "password2",
      "id": 2,
    },
  ],
};

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', (req, res) => {
  //see all users
  res.json(data);
});

app.post('/users', (req, res) => {
  //create add user
  req.body.id = data.users.length + 1;
  data.users.push(req.body);
  console.log(req.body);
  console.log(data);
  res.send('Hello World');
});
app.get('/users/:id', (req, res) => {
  //get user info by id
  console.log(req.params.id);
  res.send(getRow(req.params.id));
});

app.put('/users/:id', (req, res) => {
  //update user
  console.log(req.body);
  let temp = data.users.indexOf(getRow(req.params.id));
  if (temp != -1) {
    req.body.id = req.params.id;
    data.users[temp] = req.body;
    res.write('UPDATE ID: ' + req.params.id)

  } else {
    res.write('not found id:' + req.params.id);
  }
  res.send('PUT sent');
});

app.delete('/users/:id', (req, res) => {
  //delete user
  let temp = data.users.indexOf(getRow(req.params.id));
  console.log(temp);
  if (temp != -1) {
    data.users.splice(temp, 1);
    console.log(data);
    res.write('deleted ID :' + req.params.id);

  } else {
    res.write('not found id:' + req.params.id);
  }

  res.send();
});

app.listen(3000);

//extract from db
function getRow(id) {
  for (let item of data.users) {
    if (item.id == id) {
      return item;
    }
  }
  return false;
}