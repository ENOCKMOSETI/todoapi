const express = require('express');
const sequelize = require('./db/connection');
const Todo = require('./models/todo');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.post('/todos', async (req, res) => {
    const todo = await Todo.create({
        description: req.body.description,
        status: req.body.status,
        isMesurable: req.body.isMesurable,
        progress: req.body.progress,
    });

    if (todo) {
        res.status(201).json(todo);
    } else {
    res.status(400).json({
        error: 'Bad request',
    });
}});

app.get('/todos', async (req, res) => {
    const todos = await Todo.findAll({where: {
        status: 'active',
    }});
    if (todos) {
        res.json(todos);
    } else {
        res.status(404).json({
            error: 'No active todos found',
        });
    }
})

app.get('/todos/all', async (req, res) => {
    const todo = await Todo.findAll();
    if (todo) {
        res.send(todo);
    } else {
        res.send(404).status('Todos not found');
    }
});

app.get('/todos/done', async (req, res) => {
    const todo = await Todo.findAll({where: {
        status: 'done',
    }});
    if (todo) {
        res.send(todo);
    } else {
        res.send(404).status('Todos not done');
    }
});

app.get('/todos/archive', async (req, res) => {
    const todo = await Todo.findAll({where: {
        status: 'archived',
    }});
    if (todo) {
        res.send(todo);
    } else {
        res.send(404).status('Todos not archived');
    }
});

app.get('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        res.send(todo);
    } else {
        res.send(404).status('Todo not found');
    }
});

app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        const newTodo = {
            description: req.body.description,
            status: req.body.status,
            isMesurable: req.body.isMesurable,
            progress: req.body.progress,
        }
        if (newTodo) {
            await todo.save();
            res.send(newTodo);
        } else {
            res.send(400).status('Bad request');
        }
    } else {
        res.send(404).status('Todo not found');
    }
});

app.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        await todo.destroy();
        res.send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('db connect!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Listening on port ${port}!`)
});