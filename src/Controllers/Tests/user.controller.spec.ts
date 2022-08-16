import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../../Services/user.service';
import { CreateUserDto } from 'src/Models/CreateDTO/create-user.dto.model';
import { UpdateUserDto } from 'src/Models/UpdateDTO/update-user.dto.model';
import { UserModel } from 'src/Models/user.model';

describe('UserController', () => {
  let controller: UserController;
  const userArray:UserModel[] = [{
    id:1,
    name:"Marcos",
    age:10,
    cpf:111,
    email:"test@yahoo.ck",
    password:"senhadeteste"
  },
  {
    id:2,
    name:"Antônio",
    age:10,
    cpf:113,
    email:"test@yahoo.ck",
    password:"senhadeteste"
  }]
  const mockUserService = {
    create: jest.fn(dto =>{
      let a = {
        id:Date.now(),
        ...dto
      }
      delete a.password
      return a
    }),
    update:jest.fn().mockImplementation((id,dto)=>{
      return{
        id,
        ...dto
      }
    }),
    findAll:jest.fn().mockImplementation(()=>{
      return userArray
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a User',()=>{
    const createObj:CreateUserDto = {
      name:"Marcos",
      age:10,
      cpf:111,
      email:"test@yahoo.ck",
      password:"senhadeteste"
    }
    expect(controller.create(createObj)).toEqual({
      id: expect.any(Number),
      name:createObj.name,
      email:createObj.email,
      age:createObj.age,
      cpf:createObj.cpf
    })
    expect(mockUserService.create).toHaveBeenCalledWith(createObj)
  })
  it('should update an Users',()=>{
    const updateObj:UpdateUserDto = {
      name:"Marcos",
      age:10,
      cpf:111,
      password:"senhadeteste"
    }
    expect(controller.update("1",updateObj)).toEqual({
      id: 1,
      ...updateObj
    });
    expect(mockUserService.update).toHaveBeenCalled()
  })

  it('should find all Users',()=>{
    expect(controller.findAll()).toEqual({
      userArray
    });
    expect(mockUserService.findAll).toHaveBeenCalled()
  })
});
