import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('WildSnap API')
    .setDescription('Backend API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 3001;
  await app.listen(port);

  console.log(`🚀 NestJS running on http://localhost:${port}`);
  console.log(`📘 Swagger on http://localhost:${port}/api`);
}

bootstrap();
