import { TodoStatus } from '@prisma/client'

export class Todo {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly status: TodoStatus = TodoStatus.TODO,
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) { }
}