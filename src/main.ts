import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug', 'verbose'] });
  const port = process.env.PORT || 3000;
  app.use(morgan('dev'));
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  Logger.log(`Application is running on: http://localhost:${port}`);
  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SECRET_SESSION as string,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 24 * 60 * 60,
      }),
    }),
  );

  await app.listen(4000);
}
bootstrap();
