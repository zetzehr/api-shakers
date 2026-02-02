import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Offer, OfferDocument } from '../offer/offer.schema';
import { Model } from 'mongoose';
import { offer as offerData } from '../../data/offer.data';

function parseDate(d: string | null): Date | undefined {
  return d ? new Date(d) : undefined;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const offerModel = app.get<Model<OfferDocument>>(getModelToken(Offer.name));

  await offerModel.deleteMany({});

  const offersToInsert = offerData.map((o) => ({
    ...o,
    startDate: parseDate(o.startDate),
    creationDate: parseDate(o.creationDate),
    publishedAt: parseDate(o.publishedAt),
  })) as unknown as Partial<OfferDocument>[];

  await offerModel.create(offersToInsert);

  console.log('Offer seed OK');
  await app.close();
}

bootstrap();
