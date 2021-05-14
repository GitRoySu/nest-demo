import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import { Role } from "../role/role.entity";
import { UserEntity } from "../../libs/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  // exports: [UserService]
})
export class UserModule {}
