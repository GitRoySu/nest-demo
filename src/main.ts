import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import {logger} from './middleware/logger.middleware'
import * as express from 'express'
import { TransformInterceptor } from "./interceptor/transform.interceptor";
import { HttpExceptionFilter } from "./filter/http-exception.filter";
import { AnyExceptionFilter } from "./filter/any-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(logger)
  // 全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor())
  // 过滤器处理HTTP异常
  app.useGlobalFilters(new AnyExceptionFilter())
  app.useGlobalFilters(new HttpExceptionFilter())
  // 全局注入校验管道
  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true, // 禁用详细错误信息
  }))
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启BearerAuth 授权认证
    .setTitle('nest zero to one')
    .setDescription('the nest-zero-to-one API description')
    .setVersion('1.0')
    .addTag('test')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-doc', app, document)
  await app.listen(3000);
}
bootstrap();
