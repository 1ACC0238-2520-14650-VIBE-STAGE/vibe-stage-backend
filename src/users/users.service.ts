import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Actualizar solo los campos permitidos
    if (updateProfileDto.name !== undefined) {
      user.name = updateProfileDto.name;
    }
    if (updateProfileDto.bio !== undefined) {
      user.bio = updateProfileDto.bio;
    }
    if (updateProfileDto.phone !== undefined) {
      user.phone = updateProfileDto.phone;
    }

    const updatedUser = await this.userRepository.save(user);

    // No devolver la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword as User;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
