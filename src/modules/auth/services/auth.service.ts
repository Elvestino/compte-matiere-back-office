import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from 'src/modules/users/service/users.service';
import { CheckTokenDto } from '../dto/checkToken.dto';
import { RegisterDto } from '../dto/register.dto';
import { User } from 'src/modules/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginDto) {
    try {
      const user = await this.userService.find(data.immatricule);

      if (!(user instanceof User)) {
        throw new NotFoundException("immatricule n'existe pas");
      }

      if (!(await bcrypt.compare(data.password, user.password))) {
        throw new BadRequestException('Mot de passe incorrect');
      }

      const payload = {
        immatricule: user.immatricule,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        "Une erreur inattendue s'est produite. TSY NANDE PR E",
      );
    }
  }

  async register(registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }

  async checkToken(token: CheckTokenDto) {
    try {
      return await this.jwtService.verifyAsync(token.token, {
        secret: 'elvestinodorelin',
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
