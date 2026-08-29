import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/** apps/web-ийн `/join` маягтын `FormState`-тэй ижил талбартай (name/email заавал). */
export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
