import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class RegisterResponse {
  @Field(() => User)
  user: User;
}
