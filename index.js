const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = {
  users: [
    {
      user: 'admin',
      pass: 'pasword',
      id: 1,
    },
    {
      user: 'admin1',
      pass: 'password2',
      id: 2,
    },
  ],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', (req, res) => {
  //see all users
  res.send('<h1>Hello World</h1>');
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
  res.send();
});

app.put('/users/:id', (req, res) => {
  //update user
  console.log(req.params.id);
  res.send('PUT sent');
});

app.delete('/users/:id', (req, res) => {
  //delete user
  console.log(req.params.id);
  res.send('DELETE sent');
});

app.listen(3000);
