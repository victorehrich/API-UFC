import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, HttpStatus } from '@nestjs/common';

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../Models/UpdateDTO/update-user.dto.model';
import { CreateUserDto } from '../Models/CreateDTO/create-user.dto.model';
import { UserService } from '../Services/user.service';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'The User has been successfully created.'})
  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return newUser
  }

  @ApiOkResponse({description: 'The Users were found.'})
  @Get()
  async findAll() {
    const all = await this.userService.findAll()
    return all
  }

  @ApiOkResponse({description: 'The User was found.'})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
