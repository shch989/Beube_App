import { PickType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class CreateUserDto extends PickType(User, [
  'userId',
  'password',
  'nickname',
] as const) {}
