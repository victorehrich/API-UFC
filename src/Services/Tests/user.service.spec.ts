import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Models/CreateDTO/create-user.dto.model';
import { UserModel } from '../../Models/user.model';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    save:jest.fn().mockImplementation(dto=>{
      delete dto.password
      return Promise.resolve({id:1,...dto})
    }),
    //find,
    //findOne,
    //update:jest.fn().mockImplementation((id,dto)=>dto),
    //delete
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide:getRepositoryToken(UserModel),
        useValue:mockUserRepository
      }],
      
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create a user",async ()=>{

    const createObj:CreateUserDto = {
      name:"Marcos",
      age:10,
      cpf:111,
      email:"test@yahoo.ck",
      password:"senhadeteste"
    }
    
    expect(await service.create(createObj)).toEqual({
      id:expect.any(Number),
      name:"Marcos",
      age:10,
      cpf:111,
      email:"test@yahoo.ck",
    })
  })
});
