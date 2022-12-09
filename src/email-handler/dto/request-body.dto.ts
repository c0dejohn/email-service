import 'reflect-metadata';
import { IsEmail, IsString } from 'class-validator';
export default class RequestBodyDto {
  public name?: string;
  @IsEmail()
  @IsString()
  public email?: string;
  public subject?: string;
  public message?: string;
}
