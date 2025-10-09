import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  private events: Event[] = [];
  private idCounter = 1;

  create(createEventDto: CreateEventDto, promoterId: number): Event {
    const newEvent: Event = {
      id: this.idCounter++,
      promoterId,
      ...createEventDto,
    };
    this.events.push(newEvent);
    return newEvent;
  }

  findAll(): Event[] {
    return this.events;
  }

  findOne(id: number): Event {
    const event = this.events.find((e) => e.id === id);
    if (!event) throw new NotFoundException('Evento no encontrado');
    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto): Event {
    const event = this.findOne(id);
    Object.assign(event, updateEventDto);
    return event;
  }

  remove(id: number): void {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException('Evento no encontrado');
    this.events.splice(index, 1);
  }
}
