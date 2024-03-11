import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MemberUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class MemberParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
