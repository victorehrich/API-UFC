import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/Controllers/user.controller';
import { UserModel } from 'src/Models/user.model';
import { UserService } from '../Services/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
