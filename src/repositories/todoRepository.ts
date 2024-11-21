import { prisma } from '../prisma/client'
import { Todo } from '../models/todo'
import { TodoStatus } from '@prisma/client'

export class TodoRepository {
  async findAll(): Promise<Todo[]> {
    const todos = await prisma.todo.findMany()
    return todos.map(todo => new Todo(
      todo.title,
      todo.content,
      todo.status,
      todo.id,
      todo.createdAt,
      todo.updatedAt
    ))
  }

  async create(todo: Todo): Promise<Todo> {
    const created = await prisma.todo.create({
      data: {
        title: todo.title,
        content: todo.content,
        status: todo.status,
      },
    })
    return new Todo(
      created.title,
      created.content,
      created.status,
      created.id,
      created.createdAt,
      created.updatedAt
    )
  }

  async updateStatus(id: number, status: TodoStatus): Promise<void> {
    await prisma.todo.update({
      where: { id },
      data: { status },
    })
  }

  async findById(id: number): Promise<Todo | null> {
    const todo = await prisma.todo.findUnique({
      where: { id },
    })
    if (!todo) return null

    return new Todo(
      todo.title,
      todo.content,
      todo.status,
      todo.id,
      todo.createdAt,
      todo.updatedAt
    )
  }
}