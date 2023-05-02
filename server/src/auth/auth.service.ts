import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.authRepository.save(createUserDto)
  }
}
