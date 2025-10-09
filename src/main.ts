import 'reflect-metadata';
import { config } from 'dotenv';
import * as path from 'path';

// Cargar variables de entorno de manera explícita para compatibilidad con IDE
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

// Buscar el archivo .env en el directorio raíz del proyecto
const envPath = path.resolve(__dirname, '..', '.env');
console.log('Looking for .env at:', envPath);

const result = config({ path: envPath });
if (result.error) {
  console.error('Error loading .env:', result.error);
} else {
  console.log('Environment variables loaded successfully');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_USERNAME:', process.env.DB_USERNAME);
  console.log('DB_DATABASE:', process.env.DB_DATABASE);
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validaciones globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Habilitar CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('VibeStage API')
    .setDescription('API RESTful para conectar artistas y promotores.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
void bootstrap();
