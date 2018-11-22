const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const api = express();

api.set('views', __dirname + '/views');
api.set('view engine', 'ejs');
api.use(bodyParser.urlencoded({ extended: true }));

api.get('/', (req, res) => {
    res.render('home');
});

// This route is for testing the POST HTTP Method
api.get('/form', (req, res) => {
    res.render('form');
});

// Routes for the exercise
api.get('/loginform', (req, res) => {
    res.render('login');
});

api.get('/registerform', (req, res) => {
    res.render('register');
});

api.get('/route1', (req, res) => {
        request('https://reqres.in/api/users/2', (error, response, body) => {
        console.log('Error: ', error);
        if(response.statusCode !== 200) {
            console.log('Status Code: ', response.statusCode);
            res.send(`Error ${response.statusCode}`);
        }else{
            console.log('Status Code: ', response.statusCode);
            res.send(body);
        }
    });
});

api.get('/route2', (req, res) => {
    request('https://reqres.in/api/users/23', (error, response, body) => {
        console.log('Error: ', error);
        if(response.statusCode !== 200){
            console.log('Status Code: ', response.statusCode);
            res.send(`Error ${response.statusCode}`);
        }else{
            console.log('Status Code: ', response.statusCode);
            res.send(body);
        }
    });
});

api.get('/route3', (req, res) => {
    request('https://reqres.in/api/unknown', (error, response, body) => {
        if(response.statusCode !== 200){
            console.log('Status Code: ', response.statusCode);
            res.send(`Error ${response.statusCode}`);
        }else{
            console.log('Status Code: ', response.statusCode);
            res.send(body);
        }
    });
});

api.get('/route4', (req, res) => {
    request('https://reqres.in/api/unknown/2', (error, response, body) => {
        if(error || response.statusCode !== 200){
            console.log('Status Code: ', response.statusCode);
            console.log('Error: ', error);
            res.send(`Error ${response.statusCode}`);
        }else if(!error && response.statusCode === 200){
            console.log('Status Code: ', response.statusCode);
            console.log('Error: ', error);
            res.send(body);
        }
    });
});

api.get('/route5', (req ,res) => {
    request('https://reqres.in/api/unknown/23', (error, response, body) => {
        if(response.statusCode !== 200){
            console.log('Error: ', error);
            console.log('Status Code: ', response.statusCode);
            res.send(`Error ${response.statusCode} Body: ${body}`);
        }else{
            res.send(body);
        }
    });
})

api.get('/route6', (req, res) => {
    request('https://reqres.in/api/users?delay=3', (error, response, body) => {
        if(response.statusCode !== 200){
            console.log('Error: ', error);
            console.log('Status Code: ', response.statusCode);
            res.send(`Error ${response.statusCode} Body: ${body}`);
        }else{
            res.send(body);
        }
    });
})

api.post('/route7', (req, res) => {
    const user = {
        'email': 'peter@klaven',
        'password': 'cityslicka'
    };
    request.post({
        uri: 'https://reqres.in/api/login',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: require('querystring').stringify(user),
    }, (error, response, body) => {
        console.log(body);
        console.log(response.statusCode);
        console.log(error);
        res.send(body);
    })
});

api.post('/route8', (req, res) => {
    const user = {
        'email': req.body.email,
        'password': req.body.password
    };
    request.post({
        uri: 'https://reqres.in/api/register',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: require('querystring').stringify(user),
    }, (error, response, body) => {
        console.log('Error: ', error);
        console.log('Status Code: ', response.statusCode);
        console.log('Body: ', body);
        res.send(body);
    });
});

//Testing the POST HTTP Methods
api.post('/test', (req, res) => {
    const postData = {
        'name': 'Leo',
        'job': 'Student'
    };
    request.post({
        uri: 'https://reqres.in/api/users',
        headers: { 'content-type': 'application/x-www-form-urlenconded' },
        body:require('querystring').stringify(postData),
    },
    (error, response, body) => {
        console.log(body);
        console.log(error); 
        res.send(body);
    });
});

api.post('/insertData', (req, res) => {
    const data = {
        'name': req.body.name,
        'job': req.body.job,
    };
    request.post({
        uri: 'https://reqres.in/api/users',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body:require('querystring').stringify(data),
    }, (error, response, body) => {
        console.log(body);
        console.log(error);
        console.log(response.statusCode);
        res.send(body);
    });
})

api.listen(3000, () => {
    console.log('Server running on 3000');
})