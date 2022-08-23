import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../Models/CreateDTO/create-user.dto.model';
import { UserModel } from '../Models/user.model';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../Models/UpdateDTO/update-user.dto.model';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserModel) private userRepository: Repository<UserModel>){}

  public async create(createUserDto: CreateUserDto):Promise<UserModel> {
    try{
      let createUserObj = await this.userRepository.save(createUserDto)
      delete createUserObj.password
      return createUserObj
    }
    catch(err){
      throw new Error(err)
    }
  }

  public async findAll() {
    try{
      const UserList = await this.userRepository.find()
      
      if(!UserList){
        throw new NotFoundException("No User are in the database")
      }
      return UserList;
    }catch(err){
      throw new Error(err)
    }
  }

  public async findOne(id: number) {
    try{
      const User = await this.userRepository.findOne({
        where:{
          id: id
        }
      })
      if(!User){
        throw new NotFoundException(`User with a ${id} not found`)
      }
      return User;

    }catch(err){
      throw new Error(err)
    }

  }

  public async update(id: number, updateUserDto: UpdateUserDto):Promise<UserModel> {
    let UserUpdated
    try{
      const User = await this.findOne(id)
      if(!!User){
        UserUpdated = await this.userRepository.update(id,updateUserDto)
      }
      return UserUpdated
    }
    catch(err){
      throw new Error(err)
    }
  }

  public async remove(id: number) {
    try{
      const User = await this.findOne(id)
      if(!!User){
        await this.userRepository.delete(id)
        return `User with id ${id} was successful removed`
      }
      return "User not found"
    }
    catch(err){
      throw new Error(err)
    }
  }
}
