// import express to 
const express = require('express');

// get the path object(it is an inbuilt object , so no need to install it )
const path = require('path');

// Port Number at which the server will running
const port = 8000;

// access to database
const db = require('./config/mongoose');

// create object of express
const app = express();

// use ejs as template engine
app.set('view engine','ejs');

// set the path of view directory
app.set('views',path.join(__dirname,'views'));

// import todo object from models to create various entities
const Todo = require('./models/todo');

// FOR DECODING URL
app.use(express.urlencoded());

// use css file
app.use(express.static('assests'));

// Display added task to home page 
app.get('/',function(req,res){

    Todo.find({},function(err,todos){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home',{

            title : "ToDo-List",
            todo_list : todos
        });

    });

});

// This is url for creating task in database
app.post('/create-todo',function(req,res){

    Todo.create({

        description: req.body.description,
        category:req.body.category,
        date:req.body.date

    },function(err,newtodo){
        if(err){
            console.log('Error in creating the ToDo List');
            return;
        }
        console.log('***',newtodo);
        return res.redirect('back');
    });
});

// This is the url to delete single task from db when click on X button
app.get('/delete_todo_single', function(req, res) {
    let id = req.query.id;
    Todo.findByIdAndDelete(id, function(err){
        if(err) {
            console.log("error");
            return;
        }
        return res.redirect('back');
    });
});

//This is the url to delete multiple item from database
app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    if(ids.length<1){
        console.log('fool');
        return;
    }
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("Error in deleting the task"); 
                return; 
            }
        });
    } 
    // if multiple task is to be deleted
    else {  
        for (let i = 0; i < ids.length; i++) {
            Todo.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});

// check whether server is started or not
app.listen(port,function(err){
    if(err){
        console.log("Error in setting up the server");
        return;
    }
    console.log("Express server is up and running on port no:",port);
});