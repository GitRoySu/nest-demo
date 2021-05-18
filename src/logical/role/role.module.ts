import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import {UserEntity} from "../../libs/entity/user.entity";
import { JwtStrategy } from "../auth/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([Role,UserEntity])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
