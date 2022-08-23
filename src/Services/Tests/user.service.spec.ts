import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Models/CreateDTO/create-user.dto.model';
import { UpdateUserDto } from 'src/Models/UpdateDTO/update-user.dto.model';
import { Repository } from 'typeorm';
import { UserModel } from '../../Models/user.model';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserModel>
  const userArray:UserModel[] = [{
    id:1,
    name:"Marcos",
    age:10,
    cpf:111,
    email:"test@yahoo.ck",
    password:"senhadeteste"
  },{
    id:2,
    name:"Antônio",
    age:10,
    cpf:113,
    email:"test@yahoo.ck",
    password:"senhadeteste"
  }]

  const mockUserRepository = {
    save:jest.fn().mockImplementation(async dto=>{
      delete dto.password
      return {id:1,...dto}
    }),
    find:jest.fn().mockImplementation(async ()=>{
      return userArray
    }),
    findOne:jest.fn().mockImplementation(async params=>{
      return userArray.find(user=>user.id == params.where.id)
    }),
    update:jest.fn().mockImplementation(async (id,dto)=>dto),
    delete:jest.fn().mockImplementation(async (id)=>`User with id ${id} was successful removed`),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide:getRepositoryToken(UserModel),
        useValue:mockUserRepository
      }],
      
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserModel>>(getRepositoryToken(UserModel))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined()
  });
  describe("create",()=>{

    const createObj:CreateUserDto = {
      name:"Marcos",
      age:10,
      cpf:111,
      email:"test@yahoo.ck",
      password:"senhadeteste"
    }
    it("should create a user",async ()=>{
    
      const result = await service.create(createObj)
      expect(result).toEqual({
        id:expect.any(Number),
        name:"Marcos",
        age:10,
        cpf:111,
        email:"test@yahoo.ck",
      })
    })
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserRepository, 'save').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.create(createObj)).rejects.toThrowError();
    });
  })
  
  describe("update",()=>{
    const updateObj:UpdateUserDto = {
      name:"Marcos",
      age:10,
      cpf:111,
      email:"test@yahoo.ck",
      password:"senhadeteste"
    }
    it("should update a user",async ()=>{
      const result = await service.update(1,updateObj)
      expect(result).toStrictEqual(updateObj)
    })
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserRepository, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.update(1,updateObj)).rejects.toThrowError();
    });
  })
  describe("find",()=>{
    it("should find an array of users", async ()=>{
      const result = await mockUserRepository.find()
      expect(result).toStrictEqual(userArray)
    })
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserRepository, 'find').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.findAll()).rejects.toThrowError();
    });
  })
  describe("findOne",()=>{
    it("should find a specific user in an array of users", async ()=>{
      const result = await mockUserRepository.findOne({where:{id: 1}})
      expect(result).toStrictEqual(userArray.find(user=>user.id == 1))
    })
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserRepository, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.findOne(1)).rejects.toThrowError();
    });
  })
  describe("remove",()=>{
    it("should remove a user",async ()=>{
      const result = await service.remove(1)
      expect(result).toStrictEqual(`User with id ${1} was successful removed`)
    })
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserRepository, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.remove(2)).rejects.toThrowError();
    });
  })
});
