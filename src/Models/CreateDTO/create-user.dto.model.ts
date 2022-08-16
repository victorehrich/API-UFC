import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsInt()
    @Min(1)
    age:number

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    cpf:number

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string
}
