import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {getMetadataArgsStorage} from 'typeorm';
import config from "./db.config";


@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        const { host, port, username, password, database, entities } = config.mysql;
        return {
          type: "mysql",
          host: host,
          port: Number(port),
          username: username,
          password: password,
          database: database,
          // entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
          entities: entities,
          synchronize: true,
          logging: false,
          "autoLoadEntities": true,
          timezone: "+08:00" // 东八区
        };
      }
    }),
  ],
  providers: [],
  exports: []
})

export class DbModule {
}
