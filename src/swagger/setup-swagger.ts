import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, swaggerPath: string): void {
  const config = new DocumentBuilder()
    .setTitle('Smart Dinner API')
    .setDescription('Documentação OpenAPI da API Smart Dinner.')
    .setVersion('1.0')
    // Quando houver auth JWT, descomente ou ajuste o nome do esquema nos controllers com @ApiBearerAuth('JWT')
    // .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
