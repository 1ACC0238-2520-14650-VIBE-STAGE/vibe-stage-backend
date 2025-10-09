import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { GetShowsFilterDto } from './dto/get-shows-filter.dto';
import { Request as ExpressRequest } from 'express';

interface JwtRequest extends ExpressRequest {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

@ApiTags('Shows')
@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Obtener shows con filtros opcionales (género, ubicación, fechas, paginación)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de shows obtenida exitosamente',
  })
  findAll(@Query() filters: GetShowsFilterDto) {
    return this.showsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un show específico por ID' })
  @ApiParam({ name: 'id', description: 'ID del show', type: 'number' })
  @ApiResponse({ status: 200, description: 'Show encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Show no encontrado' })
  findOne(@Param('id') id: string) {
    return this.showsService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo show' })
  @ApiResponse({ status: 201, description: 'Show creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token requerido' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createShowDto: CreateShowDto, @Request() req: JwtRequest) {
    if (!req.user) {
      throw new Error('Usuario no autenticado');
    }
    return this.showsService.create(createShowDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un show (solo el promoter que lo creó)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del show a actualizar',
    type: 'number',
  })
  @ApiResponse({ status: 200, description: 'Show actualizado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token requerido' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Solo puedes editar tus propios shows',
  })
  @ApiResponse({ status: 404, description: 'Show no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateShowDto: UpdateShowDto,
    @Request() req: JwtRequest,
  ) {
    if (!req.user) {
      throw new Error('Usuario no autenticado');
    }
    return this.showsService.update(+id, updateShowDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un show (solo el promoter que lo creó)' })
  @ApiParam({
    name: 'id',
    description: 'ID del show a eliminar',
    type: 'number',
  })
  @ApiResponse({ status: 200, description: 'Show eliminado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado - Token requerido' })
  @ApiResponse({
    status: 403,
    description: 'Prohibido - Solo puedes eliminar tus propios shows',
  })
  @ApiResponse({ status: 404, description: 'Show no encontrado' })
  async remove(@Param('id') id: string, @Request() req: JwtRequest) {
    if (!req.user) {
      throw new Error('Usuario no autenticado');
    }
    await this.showsService.remove(+id, req.user.id);
    return { message: 'Show eliminado exitosamente' };
  }
}
