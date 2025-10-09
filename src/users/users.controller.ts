import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @ApiOperation({ summary: 'Actualizar un usuario' })
  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
    return this.usersService.update(id, data);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
