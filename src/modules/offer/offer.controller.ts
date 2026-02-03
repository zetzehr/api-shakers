import { Controller, Get, Query } from '@nestjs/common';
import { OfferService } from './offer.service';
import { GetOfferById, GetOffersQueryDto } from './dto/get-offers.query.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get('getOffers')
  getOffers(@Query() query: GetOffersQueryDto) {
    return this.offerService.getOffers(query);
  }

  @Get('getOfferById')
  getOfferById(@Query() query: GetOfferById) {
    return this.offerService.getOfferById(query);
  }
}
