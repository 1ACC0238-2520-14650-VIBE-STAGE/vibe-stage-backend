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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

interface RequestWithUser {
  user: {
    id: number;
    role: string;
  };
}

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Crear un nuevo evento' })
  @Post()
  create(@Body() dto: CreateEventDto, @Request() req: RequestWithUser) {
    const user = req.user;
    if (user.role !== 'promoter') {
      return { message: 'Solo los promotores pueden crear eventos' };
    }
    return this.eventsService.create(dto, user.id);
  }

  @ApiOperation({ summary: 'Obtener todos los eventos' })
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un evento por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Actualizar un evento' })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(Number(id), dto);
  }

  @ApiOperation({ summary: 'Eliminar un evento' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.eventsService.remove(Number(id));
    return { message: 'Evento eliminado correctamente' };
  }
}
