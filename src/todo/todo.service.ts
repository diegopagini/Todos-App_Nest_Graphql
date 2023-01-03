import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
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
  ];

  /**
   * Method to get all the todos.
   * @returns Todo[]
   */
  findAll(): Todo[] {
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
