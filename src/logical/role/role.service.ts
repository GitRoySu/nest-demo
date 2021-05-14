import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { getRepository, Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import {dealObjectEmptyValue} from '../../../utils/index'
import { UserEntity } from "../../libs/entity/user.entity";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private role: Repository<Role>,
              @InjectRepository(UserEntity) private user: Repository<UserEntity>) {
  }

  async findAll(query:any):Promise<any>{
    // 过滤空的入参
    let queryReq = dealObjectEmptyValue(query)
    console.log(queryReq)
    // let roleList = await getRepository({...query})
    //   .createQueryBuilder('role')
    //   .where("role.id = :id", {id: query.id})
    //   .getMany()

    let roleList = await this.role.findAndCount({...queryReq})

    console.log(roleList)
    return {
      list:roleList[0],
      total: roleList[1]
    }
  }

  /**
   * 新增权限
   * @param roleName
   */
  async add(roleName):Promise<any> {
    try {
      let res = await this.role.save({roleName})
      return {
        message: '新增成功'
      }
    }catch (err){
      return {
        message:err.message
      }
    }
  }

  /**
   * 设置权限用户
   * @param id {number} 权限id
   * @param userId {number} 用户id
   * @param body
   */
  async setUserRole(body:any):Promise<any>{
    try {
      // let role = await this.role.findOne(body.id)
      // let user = await this.user.findOne(body.userId)
      // role.user = user
      // await this.role.save(role)
      // return {
      //   message: '设置用户权限成功'
      // }
    }catch (err){
      return {
        message:err
      }
    }
  }


}
