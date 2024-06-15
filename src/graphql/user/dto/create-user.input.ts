import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User as UserModel } from '../model/user.model';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  token: string;
}

@InputType()
export class BiometricLoginUserInput {
  @Field()
  @IsString()
  biometricKey: string;
}
