import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo quick agregations' })
export class AggregationsType {
  @Field(() => Int)
  completed: number;
  @Field(() => Int)
  pending: number;
  @Field(() => Int)
  total: number;
  @Field(() => Int, { deprecationReason: 'Must use completed instead.' })
  totalTodos: number;
}
