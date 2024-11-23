import { Request, Response } from 'express'
import { TodoService } from '../services/todoService'
import { TodoStatus } from '@prisma/client'

export class TodoController {
  constructor(private todoService: TodoService) { }

  async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoService.getAllTodos();
      res.json({ todos });
    } catch (error) {
      console.error('Error in getTodos:', error); // エラーログを追加
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title, content } = req.body
      const todo = await this.todoService.createTodo(title, content)
      res.status(201).json({ todo })
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async updateTodoStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const { status } = req.body
      if (!Object.values(TodoStatus).includes(status)) {
        res.status(400).json({ error: 'Invalid status' })
        return
      }
      await this.todoService.updateTodoStatus(Number(id), status)
      res.status(200).json({ message: 'Status updated successfully' })
    } catch (error) {
      if (error instanceof Error && error.message === 'Todo not found') {
        res.status(404).json({ error: 'Todo not found' })
        return
      }
      res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}