import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateShowDto {
  @ApiProperty({
    description: 'Título del show',
    example: 'Rock Night Lima',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descripción del show',
    example: 'Evento de bandas de rock alternativo',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Ubicación del show',
    example: 'Centro Cultural Lima',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Fecha del show',
    example: '2025-11-10',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Género musical',
    example: 'Rock',
    required: false,
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({
    description: 'ID del artista asignado al show',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  artistId?: number;

  @ApiProperty({
    description: 'ID del evento relacionado',
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  eventId?: number;
}
