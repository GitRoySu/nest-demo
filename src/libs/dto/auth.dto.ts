import { IsNotEmpty } from "class-validator";
import { Column, JoinColumn, ManyToOne } from "typeorm";
import { Role } from "../../logical/role/role.entity";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class findOneUserDto{
  @ApiProperty()
  @IsNotEmpty()
  firstName:string
}

export class loginDto{
  @ApiProperty()
  @IsNotEmpty()
  username:string

  @ApiProperty()
  @IsNotEmpty()
  password:string
}

export class addAuthDto{
  // @IsNotEmpty()
  // roleId: Role

  @ApiProperty()
  @IsNotEmpty()
  accountName:string

  @ApiProperty()
  @IsNotEmpty()
  realName: string

  @ApiProperty()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsNotEmpty()
  rePassword: string

  @ApiPropertyOptional({
    description: 'mobile不是必填的'
  })
  @ApiProperty()
  @IsNotEmpty()
  mobile: string

  @ApiProperty()
  @IsNotEmpty()
  userStatus: number
}
