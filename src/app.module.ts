// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IndexModule } from './modules/index/index.module';
import { OfferModule } from './modules/offer/offer.module';
import { KeywordModule } from './modules/keyword/keyword.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    IndexModule,
    OfferModule,
    KeywordModule,
  ],
})
export class AppModule {}
