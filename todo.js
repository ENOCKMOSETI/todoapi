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
    res.status(400).send({
        error: 'Bad request',
    });
}});

app.get('/', async (req, res) => {
    const todos = await Todo.findAll({where: {
        status: 'active',
    }});
    if (todos) {
        res.status(200).send(todos);
    } else {
        res.status(404).send('Active todos not found');
    }
})

app.get('/todos', async (req, res) => {
    const todos = await Todo.findAll({where: {
        status: 'active',
    }});
    if (todos) {
        res.status(200).send(todos);
    } else {
        res.status(404).send('Active todos not found');
    }
})

app.get('/todos/all', async (req, res) => {
    const todos = await Todo.findAll();
    if (todos) {
        res.status(200).send(todos);
    } else {
        res.send(404).status('Todos not found');
    }
});

app.get('/todos/done', async (req, res) => {
    const todos = await Todo.findAll({where: {
        status: 'done',
    }});
    if (todos) {
        res.status(200).send(todos);
    } else {
        res.status(404).send('Todos not done');
    }
});

app.get('/todos/archive', async (req, res) => {
    const todos = await Todo.findAll({where: {
        status: 'archived',
    }});
    if (todos) {
        res.status(200).send(todos);
    } else {
        res.status(404).send('Todos not archived');
    }
});

app.get('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        res.status(200).send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        todo.update({
            description: req.body.description,
            status: req.body.status,
            isMesurable: req.body.isMesurable,
            progress: req.body.progress,
        });
        if (todo.progress == 100) {
            todo.update({
                status: 'done',
            });
        }
        res.status(200).send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
        await todo.destroy();
        res.status(204).send(todo.id);
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