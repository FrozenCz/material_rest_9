import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import * as fs from 'fs';

async function bootstrap() {
  let sslConfig = {};

  if (process.env.ssl) {
    sslConfig = {
      httpOptions: {
        key: fs.readFileSync(
          '/etc/letsencrypt/live/dp-rest.milanknop.cz/privkey.pem',
        ),
        cert: fs.readFileSync(
          '/etc/letsencrypt/live/dp-rest.milanknop.cz/fullchain.pem',
        ),
      },
    };
  }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    sslConfig,
  );

  const options = new DocumentBuilder()
    .setTitle('BP - backend')
    .setDescription('Milan Knop')
    .setVersion('0.1')
    .addTag('backend')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ limit: '200mb', extended: true }));
  await app.listen(3000);
}

bootstrap();
