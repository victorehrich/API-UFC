import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './Models/user.model';
import { UserModule } from './Modules/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'db',
    entities: [UserModel],
    synchronize: true,
  }), 
  UserModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
