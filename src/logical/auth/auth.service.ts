import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { encryptPassword, makeSalt } from "../../../utils/cryptogram";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../../libs/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 注册功能
   * @param reqBody {accountName, realName, password, rePassword, mobile, userStatus, roleId}
   */
  async register(reqBody: any): Promise<any> {
    const { accountName, realName, password, rePassword, mobile, userStatus, roleId } = reqBody;

    if (password !== rePassword) {
      return {
        code: 400,
        message: "两次密码不一致"
      };
    }
    // 查询，判断是否已有同名用户
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        message: "用户已存在"
      };
    }
    const salt = makeSalt(); // 密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    try {
      await this.userRepository.save({
        accountName,
        realName,
        mobile,
        password: hashPwd,
        passwdSalt: salt,
        userStatus,
        roleId
      });

      return {
        code: 200,
        message: "操作成功"
      };
    } catch (err) {
      return {
        code: 503,
        message: err
      };
    }

  }

  /**
   * 登录验证逻辑
   * @param accountName
   * @param password
   */
  async validateUser(accountName: string, password: string): Promise<any> {
    console.log("JWT验证 - Step 2: 校验用户信息");
    const auth = await this.findOne({ accountName: accountName });
    if (auth) {
      const hashedPassword = auth.password;
      const salt = auth.passwdSalt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          // message: '成功',
          auth
        };
      } else {
        // 密码错误
        return {
          code: 2,
          auth: null
          // message: '密码错误'
        };
      }
    }
    return {
      code: 3,
      // message: '查无此人',
      auth: null
    };
  }

  /**
   * jwt验证
   * @param user
   */
  async certificate(user: any) {
    const payload = { accountName: user.accountName, id: user.id, realName: user.realName, role: user.role };
    console.log("JWT验证 - Step 3: 处理 jwt 签证");
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token
        },
        message: "登录成功"
      };
    } catch (err) {
      return {
        code: 600,
        msg: `账号或密码错误`
      };
    }
  }

  async findOne(body): Promise<any | undefined> {
    let auth = await this.userRepository.findOne({ accountName: body.accountName });
    return auth;
  }
}
