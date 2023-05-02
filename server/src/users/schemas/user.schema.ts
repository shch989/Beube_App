import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @IsString()
  @MinLength(6)
  @Prop({
    unique: true,
  })
  @IsNotEmpty({ message: '아이디는 비워둘 수 없습니다.' })
  userId: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty({ message: '비밀번호는 비워둘 수 없습니다.' })
  password: string;

  @IsString()
  @MinLength(2)
  @Prop({
    unique: true,
  })
  @IsNotEmpty({ message: '닉네임은 비워둘 수 없습니다.' })
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
