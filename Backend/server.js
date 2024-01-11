const express = require('express');

const Todo = require('./db/todos');

const port = 3000 || process.env.PORT;
const app = express();

app.use(express.json());

// reqCounter
app.use((req, res, next)=>{
    console.log('req');
    next();
});

// return all todos
app.get('/todos', async(req, res)=>{
    try{
        res.send(await Todo.find({}));
    }catch(err)
    {
        res.status(505).send("Couldn't save, try again");
    }
});

// adding a todo
app.post('/todos', (req, res)=>{
    let title = req.body.title;
    let description = req.body.description;

    let newTodo = new Todo({
        title : title,
        description : description,
        markDone : false
    });
    try{
        newTodo.save();
        res.send(newTodo._id);
    }catch(err)
    {
        res.status(505).send("Couldn't save, try again");
    }
});

// deleting a todo
app.delete('/todos/:id', async (req, res)=>{
    let id = req.params.id;

    try{
        await Todo.deleteOne({_id: id});
        res.send('Deleted');
    }catch(err)
    {
        res.status(505).send("Couldn't delete, try again");
    }
});

// updating marDone status of a todo
app.patch('/todos/:id', async(req, res)=>{
    let id = req.params.id;
    
    let toChangeMarkDone = req.body.markDone;

    try{
        console.log(toChangeMarkDone);
        await Todo.findByIdAndUpdate(id, {markDone: toChangeMarkDone});
        res.send('markDone state changed!')
    }catch(err)
    {
        res.send("Couldn't change state, try again!");
    }
});

// global catch
app.use((err, req, res, next)=>{
    if(err) res.send('Invalid route');
});


app.listen(port, ()=>{
    console.log(`Server listening on ${port}...`);
});