import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function createApp(module: any): Promise<INestApplication> {
  const app = await NestFactory.create(module);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Comicplex API')
    .setDescription('Comicplex API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());

  return app;
}

async function bootstrap() {
  const app = await createApp(AppModule);
  await app.listen(3000);
}

bootstrap().then(() => {
  console.log('Server started');
});
