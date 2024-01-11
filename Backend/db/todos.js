const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adminsid:xw05Ltqj0mIq3NKO@cluster001.wth6wk9.mongodb.net/');;


let todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    markDone : Boolean
});

let Todo = mongoose.model('Todo', todoSchema);


module.exports = Todo;