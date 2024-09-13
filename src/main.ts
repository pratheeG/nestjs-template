import './tracing';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import helmet from 'helmet';
import { validationExceptionFactory } from './common/filters/dto-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const validationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: validationExceptionFactory,
    forbidNonWhitelisted: true,
  });
  app.useGlobalPipes(validationPipe);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );
  app.use(helmet());
  app.enableCors();
  app.enableVersioning();
  await app.listen(3000);
}
bootstrap();
