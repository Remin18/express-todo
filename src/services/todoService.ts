import { Todo } from '../models/todo'
import { TodoRepository } from '../repositories/todoRepository'
import { TodoStatus } from '@prisma/client'

export class TodoService {
  constructor(private todoRepository: TodoRepository) { }

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.findAll()
  }

  async createTodo(title: string, content: string): Promise<Todo> {
    const todo = new Todo(title, content)
    return await this.todoRepository.create(todo)
  }

  async updateTodoStatus(id: number, status: TodoStatus): Promise<void> {
    const todo = await this.todoRepository.findById(id)
    if (!todo) {
      throw new Error('Todo not found')
    }
    await this.todoRepository.updateStatus(id, status)
  }
}