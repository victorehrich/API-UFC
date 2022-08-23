import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, HttpStatus } from '@nestjs/common';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/Services/user.service';
import { UpdateUserDto } from 'src/Models/UpdateDTO/update-user.dto.model';
import { CreateUserDto } from 'src/Models/CreateDTO/create-user.dto.model';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'The User has been successfully created.'})
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    return newUser
  }

  @Get()
  async findAll(@Res() response,) {
    const all = await this.userService.findAll()
    return response.status(HttpStatus.OK).send({
      Users:[all]
    }) 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
