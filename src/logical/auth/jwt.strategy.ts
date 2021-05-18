import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {jwtConstants} from "./constants";
import {ExtractJwt,Strategy } from 'passport-jwt'

/**
 * 编写JWT验证策略
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // jwt验证
  async validate(payload:any){
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return {
      userId: payload.sub, username: payload.username, realName: payload.realName, role: payload.role
    }
  }
}
