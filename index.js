const express = require('express');
const app = express();
const port = process.env.PORT || 8880;

app.use(express.json());


let todos = [];


app.get('/todos', (req, res) => {
    res.json(todos);
});


app.post('/todos', (req, res) => {
    console.log(req.body); 
    const todo = {
        id: todos.length + 1,
        title: req.body.task,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});



app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});


app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed || todo.completed;

    res.json(todo);
});


app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
