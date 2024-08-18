import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API app store')
    .setDescription('Esta api describe la plataforma de aplicaciones mobile')
    .setVersion('1.0.0')
    .addTag('app-store-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Estas lineas cambias para poder generar el yaml para lo de OPEN API
  SwaggerModule.setup('api', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });
}
bootstrap();