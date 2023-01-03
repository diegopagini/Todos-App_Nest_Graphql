import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  done: boolean = false;

  @Field(() => Int)
  id: number;
}
