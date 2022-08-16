import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserModel{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column('int')
    age:number

    @Column()
    cpf:number

    @Column()
    email:string

    @Column()
    password:string
    
}