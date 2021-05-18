import { Body, Controller, Post, ValidationPipe, UsePipes, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { addAuthDto, loginDto } from "../../libs/dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  /**
   * 注册
   * @param body
   */
  @Post('add')
  add(@Body() body:addAuthDto){
    return this.authService.register(body)
  }

  /**
   * 登录
   * @param loginParams
   */
  @Post('login')
  async login(@Body() loginParams:loginDto){
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParams.username, loginParams.password)
    switch (authResult.code){
      case 1:
        return this.authService.certificate(authResult.auth);
      case 2:
        return {
          code: 600,
          message: '账号密码不正确'
        }

      default:
        return {
          code: 600,
          message: '查无此人'
        }
    }
  }
}
