import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  public email: string;

  @MinLength(8)
  @MaxLength(16)
  public password: string;
}
