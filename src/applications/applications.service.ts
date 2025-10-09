import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
import { ShowsService } from '../shows/shows.service';

@Injectable()
export class ApplicationsService {
  private applications: Application[] = [];
  private idCounter = 1;

  constructor(private readonly showsService: ShowsService) {}

  create(dto: CreateApplicationDto, artistId: number): Application {
    const existing = this.applications.find(
      (a) => a.artistId === artistId && a.eventId === dto.eventId,
    );
    if (existing) {
      throw new BadRequestException('Ya te has postulado a este evento.');
    }

    const application: Application = {
      id: this.idCounter++,
      artistId,
      eventId: dto.eventId,
      message: dto.message ?? '',
      status: 'pending',
    };

    this.applications.push(application);
    return application;
  }

  findAll(): Application[] {
    return this.applications;
  }

  findByEvent(eventId: number): Application[] {
    return this.applications.filter((a) => a.eventId === eventId);
  }

  updateStatus(id: number, status: 'accepted' | 'rejected'): Application {
    const app = this.applications.find((a) => a.id === id);
    if (!app) throw new NotFoundException('Postulación no encontrada');

    app.status = status;

    // ✅ Si fue aceptada, creamos el Show automáticamente
    if (status === 'accepted') {
      this.showsService.create(
        {
          title: `Show del artista ${app.artistId}`,
          description:
            'Show generado automáticamente por aceptación de postulación',
          location: 'Por definir',
          date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
          artistId: app.artistId,
          eventId: app.eventId,
        },
        app.artistId, // userId - usando el artistId como userId del promoter
      );
    }

    return app;
  }

  remove(id: number): void {
    const index = this.applications.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException('Postulación no encontrada');
    this.applications.splice(index, 1);
  }
}
