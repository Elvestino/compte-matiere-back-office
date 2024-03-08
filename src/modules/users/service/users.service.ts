import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async find(immatricule: string): Promise<User | NotFoundException> {
    const user = await this.usersRepository.findOne({ where: { immatricule } });
    if (!user) {
      throw new NotFoundException('immatricule pas trouver');
    }
    return user;
  }

  async delete(immatricule: string): Promise<User | NotFoundException> {
    const user = await this.usersRepository.findOne({ where: { immatricule } });
    if (!user) {
      throw new NotFoundException('immatricule pas trouver');
    }
    await this.usersRepository.remove(user);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { immatricule } = createUserDto;
    const existimmatricule = await this.usersRepository.findOne({
      where: { immatricule },
    });
    if (existimmatricule) {
      throw new ConflictException('Immatricule existe deja');
    }

    const hashedPassword = await hash(createUserDto.password, 10);
    const newUser: User = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async update(
    immatricule: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | NotFoundException> {
    try {
      const existingUser = await this.usersRepository.findOneOrFail({
        where: { immatricule },
      });

      this.usersRepository.merge(existingUser, updateUserDto);

      const updatedUser = await this.usersRepository.save(existingUser);

      return updatedUser;
    } catch (error) {
      throw new NotFoundException('immatricule pas trouver');
    }
  }
}
