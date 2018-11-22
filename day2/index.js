const express = require('express');
const body_parser = require('body-parser');

const functions = require('./functions');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {
        item: 'OSF Training Day 2 Homework'
    })
})

app.get('/route1/:number', (req, res) => {
    const number = req.params.number;
    res.send(functions.oddOrEven(number));
});

app.get('/route2/:random', (req, res) => {
    req.params.random = functions.randomNumber();
    res.render('index', {
        item: req.params.random
    })
});

app.get('/route3/:number', (req, res) => {
    if(req.params.number < 5){
        res.render('index', {
            item: `The number ${req.params.number} is less than 5`
        })
    }else {
        res.send(`The number ${req.params.number} is greater than 5`);
    }
});

const array = [10, 2, 5, 6, 12, 22, 13, 44, 33, 57, 123, 321, 124, 153, 0, 666];

app.get('/route4', (req, res) => {
    res.render('array', {
        item: array
    })
})

app.listen(3050, () => {
    console.log('Server running at port 3050');
})