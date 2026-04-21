import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const portRaw = configService.get<string>('PORT');
  const parsedPort = Number.parseInt(portRaw ?? '', 10);
  const port = Number.isFinite(parsedPort) ? parsedPort : 3000;

  const swaggerPath = configService.get<string>('SWAGGER_PATH') ?? 'api/docs';

  setupSwagger(app, swaggerPath);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/${swaggerPath}`);
}
void bootstrap();
