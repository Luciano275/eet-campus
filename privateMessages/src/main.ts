import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './chat/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({
    origin: config.get<string>('app.cors.origin'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })

  app.useWebSocketAdapter(new SocketIoAdapter(app, config));

  await app.listen(
    config.get<number>('app.port'),
  );
}
bootstrap();
