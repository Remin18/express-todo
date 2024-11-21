import express from 'express';
import { todoRouter } from './routes/todoRoutes';
import { TodoRepository } from './repositories/todoRepository';
import { TodoService } from './services/todoService';
import { TodoController } from './controllers/todoController';

const app = express();
const port = 3000;

app.use(express.json());

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

app.use('/api', todoRouter(todoController));

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});