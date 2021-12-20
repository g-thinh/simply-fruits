import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(createUserDto);
    newUser.createdAt = new Date();
    return this.usersRepository.save({ ...newUser });
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      Logger.error(err, 'ERROR');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.updatedAt = new Date();
    return this.usersRepository.save({ ...user });
  }

  async deleteUser(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
