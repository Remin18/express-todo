import { Router } from 'express';
import { TodoController } from '../controllers/todoController';

export const todoRouter = (todoController: TodoController): Router => {
  const router = Router();

  router.get('/todos', (req, res) => todoController.getTodos(req, res));
  router.post('/todos', (req, res) => todoController.createTodo(req, res));
  router.patch('/todos/:id/status', (req, res) => todoController.updateTodoStatus(req, res));

  return router;
};