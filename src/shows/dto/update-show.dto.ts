import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateShowDto {
  @ApiProperty({
    description: 'Título del show',
    example: 'Rock Night Lima - Actualizado',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'Descripción del show',
    example: 'Evento de bandas de rock alternativo con artistas invitados',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'Ubicación del show',
    example: 'Teatro Nacional, Lima',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location?: string;

  @ApiProperty({
    description: 'Fecha del show',
    example: '2025-12-15',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  date?: string;

  @ApiProperty({
    description: 'Género musical',
    example: 'Rock Alternativo',
    required: false,
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({
    description: 'ID del artista asignado al show',
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  artistId?: number;

  @ApiProperty({
    description: 'ID del evento relacionado',
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  eventId?: number;
}
