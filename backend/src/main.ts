import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    rawBody: true
  });

  const config = new DocumentBuilder()
    .setTitle('Wildsnap API')
    .setDescription('The Wildsnap API description')
    .setVersion('1.0')
    .addTag('Wildsnap')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });
  
  app.use(cookieParser());
  app.enableShutdownHooks();

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT ?? 3100);
  } else {
    await app.init();
  }
}


bootstrap();

export default server;
