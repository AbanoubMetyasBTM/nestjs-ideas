import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('example')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  await app.listen(port);
  Logger.log(`server running on http://localhost:${port}`, 'Bootstrap')
}
bootstrap();
