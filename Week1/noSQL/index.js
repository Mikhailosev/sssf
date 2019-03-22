'use strict'
//require ('custom-env').env()
require ('dotenv').config('mongoose');
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const express=require('express')
const app=express();
const demoSchema=new Schema({
    test: String,
    more: Number
});
const Demo=mongoose.model('Demo', demoSchema)
console.log(process.env)
mongoose.connect('mongodb://myTester:xyz123@localhost:27017/demo').then(()=> {
    console.log('Connecged successfully.');
    app.listen(3000);
}, err=> {
    console.log('Connection to db failed: ' +err);
});
app.get('/', (req,res)=>{
    Demo.create({ test: 'More data', more:7}).then(post=>{
        console.log(post.id);
        res.send('Created dummy data? '+post.id)
    });
});
app.get('/all', (req,res)=> {
    Demo.find().then(all=> {
        console.log(all);
        res.send(all);
    });
});