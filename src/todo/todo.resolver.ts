import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Method to get all the todos.
   * @param {StatusArgs} status
   * @returns Todo[]
   */
  @Query(() => [Todo], {
    name: 'todos',
  })
  findAll(@Args() args: StatusArgs): Todo[] {
    return this.todoService.findAll(args);
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

  /**
   * Method to create a new todo.
   * @param {CreateTodoInput} createTodoInput
   * @returns Todo
   */
  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.create(createTodoInput);
  }

  /**
   * Method to update a todo.
   * @param {UpdateTodoInput} updateTodoInput
   * @returns Todo
   */
  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Todo {
    return this.todoService.update(updateTodoInput);
  }

  /**
   * Method to delete a todo.
   * @param {number} id
   * @returns boolean
   */
  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.delete(id);
  }
}
