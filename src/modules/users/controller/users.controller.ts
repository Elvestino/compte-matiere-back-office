import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  CreateUserDto(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':immatricule')
  findOne(@Param('immatricule') immatricule: string) {
    return this.usersService.find(immatricule);
  }

  @Patch(':immatricule')
  update(
    @Param('immatricule') immatricule: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(immatricule, updateUserDto);
  }

  @Delete(':immatricule')
  remove(@Param('immatricule') immatricule: string) {
    return this.usersService.delete(immatricule);
  }
}
