import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './logical/user/user.module';
import { RoleModule } from './logical/role/role.module';
import { BullModule } from "@nestjs/bull";
import { DbModule } from "../config/db.module";
import { AuthModule } from './logical/auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    BullModule.registerQueue({
      name: 'audio',
      redis: {
        host: 'localhost',
        port: 3000
      }
    }),
    UserModule, RoleModule, DbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
