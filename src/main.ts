import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { json, urlencoded } from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle("BP - backend")
    .setDescription("Milan Knop")
    .setVersion("0.1")
    .addTag("backend")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.enableCors();

  app.use(json({ limit: "200mb" }));
  app.use(urlencoded({ limit: "200mb", extended: true }));
  await app.listen(3000);
}

bootstrap();
