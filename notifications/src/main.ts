import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './notifications/socket-io.adapter';
import { AppGuard } from './app.guard';
import { HttpService } from '@nestjs/axios';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const httpService = app.get(HttpService)

  app.setGlobalPrefix('/api')

  app.use(cookieParser(
    configService.get<string>('app.cookies.secret')
  ))

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))

  app.useGlobalGuards(new AppGuard(httpService))

  app.useWebSocketAdapter(new SocketIoAdapter(app, configService))

  app.enableCors({
    origin: configService.get<string>('app.cors.origin'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })

  await app.listen(configService.get<number>('app.port'));
}
bootstrap();
