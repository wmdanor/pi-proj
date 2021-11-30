import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
// import { resolve } from 'path';
// import { writeFileSync } from 'fs';

const basePath = process.env.BASE_PATH || 'api';

async function createApp(module: any): Promise<INestApplication> {
  const app = await NestFactory.create(module);

  app.setGlobalPrefix(basePath);

  const config = new DocumentBuilder()
    .setTitle('--- API')
    .setDescription('--- API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(basePath + '/docs', app, document);
  // const outputPath = resolve(process.cwd(), 'openapi.json');
  // writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.use(morgan('tiny'));

  app.use(cookieParser());

  app.enableCors();

  return app;
}

async function bootstrap() {
  const app = await createApp(AppModule);
  await app.listen(3000);
}

bootstrap().then(() => {
  console.log('Server started');
});
