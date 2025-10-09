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
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiOperation({ summary: 'Crear una nueva postulación a evento' })
  @Post()
  create(@Body() dto: CreateApplicationDto, @Request() req) {
    const user = req.user;
    if (user.role !== 'artist') {
      return { message: 'Solo los artistas pueden postular a eventos' };
    }
    return this.applicationsService.create(dto, user.id);
  }

  @ApiOperation({ summary: 'Obtener todas las postulaciones' })
  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener postulaciones por evento' })
  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.applicationsService.findByEvent(+eventId);
  }

  @ApiOperation({ summary: 'Aceptar una postulación' })
  @Put(':id/accept')
  accept(@Param('id') id: string) {
    return this.applicationsService.updateStatus(+id, 'accepted');
  }

  @ApiOperation({ summary: 'Rechazar una postulación' })
  @Put(':id/reject')
  reject(@Param('id') id: string) {
    return this.applicationsService.updateStatus(+id, 'rejected');
  }

  @ApiOperation({ summary: 'Eliminar una postulación' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.applicationsService.remove(+id);
    return { message: 'Postulación eliminada correctamente' };
  }
}
