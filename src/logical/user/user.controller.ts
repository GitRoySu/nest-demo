import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {UserService} from './user.service'
import { findOneUserDto } from "../../libs/dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('user')
@Controller('user')
@UseGuards(AuthGuard('jwt')) // 全部使用 'JWT' 进行验证
export class UserController {
  constructor(private readonly usersService: UserService) {
  }

  @Get('findOne')
  findOne(@Body() body:findOneUserDto){
    return this.usersService.findOne(body);
  }

  @Get('getList')
  findAll(){
    return this.usersService.findAll();
  }

  @Post('setUserRole')
  setUserRole(@Body() body:any){
    return this.usersService.setRole(body);
  }
}
