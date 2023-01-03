import { Injectable, NotFoundException } from '@nestjs/common';

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
}
