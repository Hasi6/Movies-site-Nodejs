const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressEdge = require('express-edge');

const app = new express();

app.use(express.static('public'));

app.use(expressEdge);

app.set('views', `${__dirname}/views`);


app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/comedy', (req, res)=>{
    res.render('comedy');
});

app.get('/contact', (req, res)=>{
    res.render('contact');
});

app.get('/faq', (req, res)=>{
    res.render('faq');
});
app.get('/genres', (req, res)=>{
    res.render('generes');
});
app.get('/horror', (req, res)=>{
    res.render('horror');
});
app.get('/icons', (req, res)=>{
    res.render('icons');
});
app.get('/list', (req, res)=>{
    res.render('list');
});
app.get('/news', (req, res)=>{
    res.render('news');
});
app.get('/news-single', (req, res)=>{
    res.render('news-single');
});
app.get('/series', (req, res)=>{
    res.render('series');
});
app.get('/short-codes', (req, res)=>{
    res.render('short-codes');
});
app.get('/single', (req, res)=>{
    res.render('single');
});
app.get('*', (req, res)=>{
    res.send('Sorry No Pages Found')
});


const port = 5000;

app.listen(port, ()=>{
    console.log(`App Started at port ${port}`);
})