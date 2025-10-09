import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @Column('varchar')
  location: string;

  @Column('varchar')
  date: string;

  @Column({ type: 'varchar', nullable: true })
  genre: string;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ type: 'int', nullable: true })
  artistId: number;

  @Column({ type: 'int', nullable: true })
  eventId: number;

  // relación con el promotor que creó el show
  @ManyToOne(() => User, (user) => user.id)
  promoter: User;
}
