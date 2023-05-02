import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
    const { userId, password, nickname } = createUserDto;

    const pattern = /^[a-zA-Z0-9]*$/; // 영어와 숫자만을 허용하는 정규표현식

    if (!pattern.test(userId)) {
      throw new BadRequestException(
        '영어와 숫자의 조합으로 이루어진 유저 아이디를 입력해주세요.',
      );
    }

    const findUserId = await this.userModel.findOne({ userId }).exec();
    const findNickname = await this.userModel.findOne({ nickname }).exec();

    if (findUserId) {
      throw new BadRequestException('이미 존재하는 유저 아이디 입니다.');
    } else if (findNickname) {
      throw new BadRequestException('이미 존재하는 닉네임 입니다.');
    } else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const createdUser = new this.userModel({
        userId,
        password: hashedPassword,
        nickname,
      });
      return createdUser.save();
    }
  }
}
