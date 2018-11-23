const express = require('express');
const bp = require('body-parser');
const qs = require('querystring');
const request = require('request');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

// Route rendering the registerUser view
app.get('/registerUser', (req, res) => {
  res.render('registerUser');
});

// Route rendering the searchUser view
app.get('/searchUser', (req, res) => {
  res.render('searchUser');
});

// Route rendering the editUser view
app.get('/editUser', (req, res) => {
  res.render('editUser');
});

// Root route listing all the contacts
app.get('/', (req, res) => {
  request.get('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts', (error, response, body) => {
    const data = JSON.parse(body);
    res.render('index', {
      data
    });
  });
});

// Register route (OK)
app.post('/register', (req, res) => {
  const user = {
    'name': req.body.name,
    'gender': req.body.gender,
    'email': req.body.email,
    'phone': req.body.phone
  };
  request.post({
    uri: 'https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify(user)
  },
    (error, response, body) => {
      console.log(req.body.gender);
      console.log('Status Code: ', response.statusCode);
      console.log('Error: ', error);
      console.log('Body: ', body);
      res.render('registerUser', {
        body
      });
    });
});

// Search route (unaccomplished)
app.get('/search', (req, res) => {
  request.get('https://f5zg6v0z92.execute-api.us-east-1.amazonaws.com/dev/contacts/:id', (error, response, body) => {
    console.log(body);
    console.log(req.query);
    res.render('showUser', {
      body,
      id: req.query
    });
  })
});

app.listen(3000, () => {
  console.log('Server Running on port 3000');
});