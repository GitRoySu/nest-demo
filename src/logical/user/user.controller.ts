import { Body, Controller, Get, Post } from "@nestjs/common";
import {UserService} from './user.service'
import { findOneUserDto } from "../../libs/dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
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
