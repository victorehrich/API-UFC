import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../CreateDTO/create-user.dto.model';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
