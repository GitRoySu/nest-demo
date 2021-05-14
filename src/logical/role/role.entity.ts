import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../libs/entity/user.entity";

@Entity()
export class Role{
  // 权限id
  @PrimaryGeneratedColumn()
  id: number;

  // 权限名称
  @Column({length:500})
  roleName: string

  // @ManyToOne(type => User, user => user.role)
  // user:User

  @OneToMany(type => UserEntity, UserEntity => UserEntity.roleId)
  @JoinColumn({
    name: 'id'
  })
  userId: number
}
