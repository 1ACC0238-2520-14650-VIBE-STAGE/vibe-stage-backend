import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'artist' | 'promoter';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column({
    type: 'enum',
    enum: ['artist', 'promoter'],
    default: 'artist',
  })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
