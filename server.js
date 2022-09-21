/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Harsh Shaileshkumar Patel Student ID: 144938206 Date: 22-09-2022
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 
var express = require("express");
var app = express();
var path = require("path");
const data = require("./blog-service.js");
var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.get('/', (req, res) => {
    res.redirect("/about");
});

app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"views/about.html"));
});

app.get("/blog", function(req,res){
    data.getAllPosts().then((data)=>{
        res.json(data);
    });
});

app.get("/post", function(req,res){
    data.getPublisgedPosts().then((data)=>{
res.json(data);
    });
});

app.get("/categories", (req,res)=>{
    data.getCategories().then((data)=>{
        res.json(data);
    });
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found");
})

data.initialize().then(function(){
    app.listen(HTTP_PORT, onHttpStart);
}).catch(function(err){
    console.log("unable to start server: " + err);
});
