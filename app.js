const express = require('express');
const bodyparser=require('body-parser')
const app=express();
const cors = require("cors");
const dotenv=require('dotenv')
const cookieParser= require('cookie-parser');
app.use(cookieParser());
dotenv.config();
app.use(cors());
const route=require('./src/routers/router');
const database=require('./src/config/database');
// const { error } = require('console');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(route);
console.log("Testing...");
database.on('open',()=>{    
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    });
});
database.on('error',(error)=>
{
    console.error('Failed to Connect to MongoDB:',error);
});
