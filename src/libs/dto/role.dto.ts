import { IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 添加角色权限dto
 */
export class AddRoleDto{
  @ApiProperty()
  @IsNotEmpty()
  roleName: string
}

export class GetRoleList{
  @ApiProperty()
  @ApiPropertyOptional({
    description: 'id不是必填的'
  })
  id: number
}
