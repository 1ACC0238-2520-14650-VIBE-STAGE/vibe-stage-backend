import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show } from './entities/show.entity';
import { User } from '../users/entities/user.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { GetShowsFilterDto } from './dto/get-shows-filter.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(filters?: GetShowsFilterDto): Promise<Show[]> {
    const queryBuilder = this.showRepository
      .createQueryBuilder('show')
      .leftJoinAndSelect('show.promoter', 'promoter');

    // Aplicar filtros si existen
    if (filters?.genre) {
      queryBuilder.andWhere('show.genre ILIKE :genre', {
        genre: `%${filters.genre}%`,
      });
    }

    if (filters?.location) {
      queryBuilder.andWhere('show.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    if (filters?.dateFrom) {
      queryBuilder.andWhere('show.date >= :dateFrom', {
        dateFrom: filters.dateFrom,
      });
    }

    if (filters?.dateTo) {
      queryBuilder.andWhere('show.date <= :dateTo', {
        dateTo: filters.dateTo,
      });
    }

    // Ordenar por fecha
    queryBuilder.orderBy('show.date', 'ASC');

    // Aplicar paginación
    if (filters?.page && filters?.limit) {
      const skip = (filters.page - 1) * filters.limit;
      queryBuilder.skip(skip).take(filters.limit);
    }

    return queryBuilder.getMany();
  }

  async findById(id: number): Promise<Show> {
    const show = await this.showRepository.findOne({
      where: { id },
      relations: ['promoter'],
    });

    if (!show) throw new NotFoundException('Show not found');

    return show;
  }

  async create(createShowDto: CreateShowDto, userId: number): Promise<Show> {
    console.log('Creating show with userId:', userId);

    const promoter = await this.userRepository.findOne({
      where: { id: userId },
    });

    console.log(
      'Found user:',
      promoter
        ? { id: promoter.id, email: promoter.email, role: promoter.role }
        : 'Not found',
    );

    if (!promoter) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (promoter.role !== 'promoter') {
      console.log(
        'User role validation failed. Expected: promoter, Got:',
        promoter.role,
      );
      throw new ForbiddenException('Solo los promotores pueden crear shows');
    }

    const show = this.showRepository.create({
      ...createShowDto,
      promoter,
    });

    return this.showRepository.save(show);
  }

  async update(
    id: number,
    updateShowDto: UpdateShowDto,
    userId: number,
  ): Promise<Show> {
    const promoter = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!promoter) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const show = await this.findById(id);
    if (show.promoter.id !== promoter.id)
      throw new ForbiddenException('You can only edit your own shows');

    // Actualizar solo los campos que se enviaron
    Object.assign(show, updateShowDto);
    return this.showRepository.save(show);
  }

  async remove(id: number, userId: number): Promise<void> {
    const promoter = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!promoter) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const show = await this.findById(id);
    if (show.promoter.id !== promoter.id)
      throw new ForbiddenException('You can only delete your own shows');

    await this.showRepository.remove(show);
  }
}
