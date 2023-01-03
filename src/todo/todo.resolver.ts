import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Method to get all the todos.
   * @returns Todo[]
   */
  @Query(() => [Todo], {
    name: 'todos',
  })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  /**
   * Method to get a single todo.
   * @param {number} id
   * @returns Todo
   */
  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  createTodo() {}

  updateTodo() {}

  removeTodo() {}
}
