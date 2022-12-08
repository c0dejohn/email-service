import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  const port = app.get(ConfigService).get('PORT', 3000);
  await app.listen(port);
}
void bootstrap();
