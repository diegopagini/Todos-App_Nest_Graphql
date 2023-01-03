import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'The id of the todo to update' })
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'What needs to be done', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    description: 'The status of the todo',
    nullable: true,
  })
  @IsOptional()
  done?: boolean;
}
