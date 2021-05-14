import { Body, Controller, Get, ParseArrayPipe, Post, Query, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { AddRoleDto, GetRoleList } from "../../libs/dto/role.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('role')
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  // @UseGuards(AuthGuard("jwt")) // 使用 'JWT' 进行验证
  @Post("add")
  add(@Body() body: AddRoleDto) {
    return this.roleService.add(body.roleName);
  }

  @Post("setUserRole")
  setUserRole(@Body() body: any) {
    return this.roleService.setUserRole(body);
  }


  @Get("getList")
  findAll(@Query() query: GetRoleList) {
    return this.roleService.findAll(query);
  }

  @Get("findByIds")
  findByIds(@Query("id", new ParseArrayPipe({ items: Number, separator: "," })) ids: any) {
    return "this action returns users by ids";
  }
}
