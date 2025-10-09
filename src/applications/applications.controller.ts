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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto, @Request() req) {
    const user = req.user;
    if (user.role !== 'artist') {
      return { message: 'Solo los artistas pueden postular a eventos' };
    }
    return this.applicationsService.create(dto, user.id);
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.applicationsService.findByEvent(+eventId);
  }

  @Put(':id/accept')
  accept(@Param('id') id: string) {
    return this.applicationsService.updateStatus(+id, 'accepted');
  }

  @Put(':id/reject')
  reject(@Param('id') id: string) {
    return this.applicationsService.updateStatus(+id, 'rejected');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.applicationsService.remove(+id);
    return { message: 'Postulación eliminada correctamente' };
  }
}
