import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
  };
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return this.usersService.findById(req.user.userId);
  }

  @ApiOperation({ summary: 'Actualizar perfil del usuario autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.userId, updateProfileDto);
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
