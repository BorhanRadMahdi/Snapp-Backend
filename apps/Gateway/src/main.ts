import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { setupswagger } from './config/swagger.config';


async function bootstrap() {
  
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter (server));

  // config
  const configService = app.get(ConfigService);  
  const configuredPort = Number(configService.get('App.port')) || 3000;

  setupswagger(app , configService);

  // Try listening on configured port, fall back if port is unavailable
  const maxAttempts = 10;
  let port = configuredPort;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await app.listen(port);
      console.log(`Server running on port ${port}`);
      break;
    } catch (err: any) {
      const code = err?.code;
      if (code === 'EACCES') {
        console.error(`Permission denied for port ${port} (EACCES). Trying next port...`);
      } else if (code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use (EADDRINUSE). Trying next port...`);
      } else {
        // Unknown error - rethrow
        console.error('Failed to start server:', err);
        throw err;
      }
      port += 1;
      if (attempt === maxAttempts - 1) {
        console.error(`Unable to bind to any port in range ${configuredPort}-${port}. Exiting.`);
        process.exit(1);
      }
    }
  }
}
bootstrap();
