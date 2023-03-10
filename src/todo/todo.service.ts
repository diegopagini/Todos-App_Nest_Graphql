import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Piedra del Alma',
      done: false,
    },
    {
      id: 2,
      description: 'Piedra del Espacio',
      done: false,
    },
    {
      id: 3,
      description: 'Piedra del Poder',
      done: true,
    },
    {
      id: 4,
      description: 'Piedra del Tiempo',
      done: true,
    },
  ];

  /**
   * Getter to get the total of todos.
   */
  get totalTodos(): number {
    return this.todos.length || 0;
  }

  /**
   * Getter to get the total of the completed todos.
   */
  get completedTodos(): number {
    return this.todos.filter((el: Todo) => el.done === true).length || 0;
  }

  /**
   * Getter to get the total of the pending todos.
   */
  get pendingTodos(): number {
    return this.todos.filter((el: Todo) => el.done === false).length || 0;
  }

  /**
   * Method to get all the todos.
   * @param {StatusArgs} status
   * @returns Todo[]
   */
  findAll(args?: StatusArgs): Todo[] {
    const { status } = args;

    if (status !== undefined)
      return this.todos.filter((el: Todo) => el.done === status);

    return this.todos;
  }

  /**
   * Method to get a single todo.
   * @param {number} id
   * @returns Todo
   */
  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found.`);

    return todo;
  }

  create({ description }: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = description;
    todo.done = false;
    todo.id = Math.max(...this.todos.map((t: Todo) => t.id), 0) + 1; // To get the highest id from the list and one to it.

    this.todos.push(todo);

    return todo;
  }

  update({ description, done, id }: UpdateTodoInput): Todo {
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done; // To evaluate against something false.

    this.todos = this.todos.map((todo: Todo) =>
      todo.id === id ? todoToUpdate : todo,
    );

    return todoToUpdate;
  }

  /**
   * Method todo delete a todo.
   * @param {number} id
   * @returns boolean
   */
  delete(id: number): boolean {
    const todo = this.findOne(id);

    if (todo) this.todos = this.todos.filter((t: Todo) => t.id !== id);

    return true;
  }
}
