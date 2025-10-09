import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Carlos Rodriguez',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'carlos@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: '123456',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Rol del usuario en la plataforma',
    example: 'promoter',
    enum: ['artist', 'promoter'],
  })
  @IsEnum(['artist', 'promoter'], {
    message: 'Role must be artist or promoter',
  })
  role: 'artist' | 'promoter';
}
