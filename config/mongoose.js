// require the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/todo-list-db');

// acquire the connection
const db = mongoose.connection;

// error message
db.on('error',console.error.bind(console,"Error in connecting to database"));

// up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to database');
})

module.exports = db;