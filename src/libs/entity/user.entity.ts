import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "../../logical/role/role.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 150})
  accountName:string

  @Column({length: 150})
  realName: string

  @Column({length: 200})
  password: string

  @Column({length: 150})
  passwdSalt: string

  @Column({length: 150})
  mobile: string

  @Column()
  userStatus: number

  @ManyToOne(type=> Role)
  @JoinColumn({
    name: 'roleId'
  })
  roleId: Role
}
