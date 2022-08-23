import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../../Services/user.service';
import { CreateUserDto } from 'src/Models/CreateDTO/create-user.dto.model';
import { UpdateUserDto } from 'src/Models/UpdateDTO/update-user.dto.model';
import { UserModel } from 'src/Models/user.model';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  
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

  const mockUserService = {
    create: jest.fn().mockImplementation(dto =>{
      let a = {
        id:Date.now(),
        ...dto
      }
      delete a.password
      return Promise.resolve(a)
    }),
    update:jest.fn().mockImplementation((id,dto)=>Promise.resolve({
        id,
        ...dto
    })),
    
    findAll:jest.fn().mockResolvedValue(userArray),

    findOne:jest.fn().mockImplementation(id=>{
      return Promise.resolve(userArray.find(user=>user.id == id))
    }),
    remove:jest.fn().mockImplementation(id=>{
      const user = userArray.indexOf(userArray.find(user=>user.id == id));
      userArray.splice(user,1)
      return Promise.resolve(userArray)
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create',()=>{
    const createObj:CreateUserDto = {
      name:"Marcos",
      age:10,
      cpf:111,
      email:"test@yahoo.ck",
      password:"senhadeteste"
    }
    it('should create a User',async ()=>{

      const result = await controller.create(createObj)
      expect(result).toEqual({
        id: expect.any(Number),
        name:createObj.name,
        email:createObj.email,
        age:createObj.age,
        cpf:createObj.cpf
      })
      expect(mockUserService.create).toHaveBeenCalledWith(createObj)
    })

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.create(createObj)).rejects.toThrowError();
    });
  })
  describe('update',()=>{

    const updateObj:UpdateUserDto = {
      name:"Marcos",
      age:10,
      cpf:111,
      password:"senhadeteste"
    }

    it('should update a User', async () => {
      const result = await controller.update("1",updateObj)

      expect(result).toEqual({
        id: 1,
        ...updateObj
      });
      expect(mockUserService.update).toHaveBeenCalledTimes(1);
      //expect(mockUserService.update).toHaveBeenCalledWith("1",updateObj)
  });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.update("1",updateObj)).rejects.toThrowError();
    });

  })
  describe("findAll",()=>{
    it('should find all Users',async ()=>{
      expect(await controller.findAll()).toEqual(
        userArray 
      );
      expect(mockUserService.findAll).toHaveBeenCalled()
    })
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.findAll()).rejects.toThrowError();
    });
  })
  describe("findOne",()=>{
    it('Should find a user by id',async ()=>{
      expect(await controller.findOne("2")).toEqual(
        {
          id:2,
          name:"Antônio",
          age:10,
          cpf:113,
          email:"test@yahoo.ck",
          password:"senhadeteste"
        }
      )
      expect(mockUserService.findOne).toHaveBeenCalled()
      expect(mockUserService.findOne).toHaveBeenCalledWith(2)
    })
    
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserService, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.findOne("2")).rejects.toThrowError();
    });
  })

  describe("Remove", ()=>{
    it('Should remove a user by id',async ()=>{
      expect(await controller.remove("1")).toEqual(
        [{
          id:2,
          name:"Antônio",
          age:10,
          cpf:113,
          email:"test@yahoo.ck",
          password:"senhadeteste"
        }]
      )
      expect(mockUserService.remove).toHaveBeenCalled()
    })
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(mockUserService, 'remove').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.remove("2")).rejects.toThrowError();
    });
  })  
});
