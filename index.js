const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = new express();

app.use(express.static('public'));


app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
});

app.get('/comedy', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/comedy.html'))
})
app.get('/contact', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})
app.get('/faq', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/faq.html'))
})
app.get('/generes', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/generes.html'))
})
app.get('/horror', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/horror.html'))
})
app.get('/icons', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/icons.html'))
})
app.get('/list', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/list.html'))
})
app.get('/news', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/news.html'))
})
app.get('/news-single', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/news-single.html'))
})
app.get('/series', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/series.html'))
})
app.get('/short-codes', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/short-codes.html'))
})
app.get('/single', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/single.html'))
})


const port = 5000;

app.listen(port, ()=>{
    console.log(`App Started at port ${port}`);
})