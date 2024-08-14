const express = require('express');
const app = express();
const port = process.env.PORT || 8880;

app.use(express.json());

// In-memory storage for todos
let todos = [];

// GET /todos: Retrieve all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos: Add a new todo
app.post('/todos', (req, res) => {
    console.log(req.body); // Log the incoming request body
    const todo = {
        id: todos.length + 1,
        title: req.body.title, // Use task if that's the intended field
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});


// GET /todos/:id: Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// PUT /todos/:id: Update an existing todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed || todo.completed;

    res.json(todo);
});

// DELETE /todos/:id: Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});

// Start the server (Only Once)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
