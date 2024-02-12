import express from 'express'
import cors from 'cors'
import { createTodo } from '../db/CreateTodo'
import { deleteTodo } from '../db/DeleteTodo'
import { updateTodo } from '../db/UpdateTodo'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())


app.post('/', async (req, res) => {
    try {
        const { id, todo } = req.body
        const response = await createTodo(id, todo)

        return res.status(200).json({
            message: 'created',
            todo: response
        })
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await deleteTodo(id);

        return res.status(200).json({
            message: 'deleted',
            todo: response
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { todo } = req.body;
        const response = await updateTodo(todo, id);

        return res.status(200).json({
            message: 'updated',
            todo: response
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(port, () => console.log(`server started on port ${port}`))