// import mongoose to use features of it
const mongoose = require('mongoose');


// creating schema for todo list object
const todoSchema = new mongoose.Schema({

    description:{
        type : String,
        required : true
    },

    category:{
        type : String,
        required : true
    },

    date:{
        type:Date,
        required:true
    }
});

const Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;