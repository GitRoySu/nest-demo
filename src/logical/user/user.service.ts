import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Role } from "../role/role.entity";
import { encryptPassword, makeSalt } from "../../../utils/cryptogram";
import {dealObjectEmptyValue} from '../../../utils'
import { UserEntity } from "../../libs/entity/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)
              private usersRepository: Repository<UserEntity>,
              @InjectRepository(Role) private roleRepository: Repository<Role>,
              private connection: Connection) {
  }

  // 创建事务
  async createMany(users: UserEntity[]){
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(users[0])
      await queryRunner.manager.save(users[1]);

      await queryRunner.commitTransaction();
    }catch (err){
      // 回滚事务
      await queryRunner.rollbackTransaction();
    }finally {
      // 手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }

  // 使用connection对象的回调函数风格的transaction
  async createMany2(users:UserEntity[]){
    await this.connection.transaction(async manager =>{
      await manager.save(users[0])
      await manager.save(users[1])
    });
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(body): Promise<any | undefined> {
    const req = dealObjectEmptyValue({...body})
    let user = await this.usersRepository.findOne({...req})
    return user
  }

  /**
   * 用id查询用户
   * @param id
   */
  async getUserById(id: number):Promise<any>{
   let user = await this.usersRepository.findOne(id)
    return user?user:Promise.reject(new Error('没有该用户'))
  }

  /**
   * 获取权限
   * @param id {number}
   */
  async getRole(id: number){
    let role = await this.roleRepository.findOne(id)
    return role?role:Promise.reject(new Error('没有该权限'))
  }

  /**
   * 设置用户权限
   * @param body
   */
  async setRole(body):Promise<any>{
    try {
      let {userId, roleId} = body
      await this.getRole(roleId)
      let user = await this.getUserById(userId)
      user.roleId = roleId
      await this.usersRepository.update({id:userId},user)
      return {
        message: '保存成功'
      }
    }catch (err){
      console.log(err)
      return {
        message: err.message
      }
    }
  }

}
