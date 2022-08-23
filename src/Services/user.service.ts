import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Models/CreateDTO/create-user.dto.model';
import { UserModel } from 'src/Models/user.model';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../Models/UpdateDTO/update-user.dto.model';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserModel) private model: Repository<UserModel>){}

  public async create(createUserDto: CreateUserDto):Promise<UserModel> {
    try{
      let createUserObj = await this.model.save(createUserDto)
      delete createUserObj.password
      return createUserObj
    }
    catch(err){
      console.error(err)
    }
  }

  public async findAll() {
    const UserList = await this.model.find()
    return UserList;
  }

  public async findOne(id: number) {
    const User = await this.model.find({
      where:{
        id: id
      }
    })
    return User;
  }

  public async update(id: number, updateUserDto: UpdateUserDto):Promise<UserModel> {
    let UserUpdated
    try{
      const User = this.findOne(id)
      if(!!User){
        UserUpdated = this.model.update(id,updateUserDto)
      }
      return UserUpdated
    }
    catch(err){
      return err
    }
  }

  public async remove(id: number) {
    let UserRemoved
    try{
      const User = this.findOne(id)
      if(!!User){
        UserRemoved = this.model.delete(id)
      }
      return UserRemoved
    }
    catch(err){
      return err
    }
  }
}
