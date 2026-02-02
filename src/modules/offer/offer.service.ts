import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Offer } from './offer.schema';
import { GetOffersQueryDto } from './dto/get-offers.query.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
  ) {}

  async getOffers(query: GetOffersQueryDto) {
    const {
      industries = [],
      category = [],
      subcategory = [],
      skills = [],
      specialties = [],
      sort = '1',
      page = '1',
    } = query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limit = 10;
    const skip = (pageNum - 1) * limit;
    const sortNum: 1 | -1 = sort === '1' ? -1 : 1;

    const match: any = {};

    if (industries.length) match['organization.industry'] = { $in: industries };

    if (category.length) match.category = { $in: category };
    if (subcategory.length) match.subcategory = { $in: subcategory };

    if (skills.length || specialties.length) {
      const elemMatch: any = {};
      if (skills.length) elemMatch.skills = { $in: skills.map(Number) };
      if (specialties.length)
        elemMatch.specialties = { $in: specialties.map(Number) };

      match.positions = { $elemMatch: elemMatch };
    }

    const pipeline: PipelineStage[] = [
      { $match: match },
      { $sort: { creationDate: sortNum } },
      { $skip: skip },
      { $limit: limit },
    ];

    const content = await this.offerModel.aggregate(pipeline);
    const totalCount = await this.offerModel.countDocuments(match);

    return {
      page: pageNum,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      content,
    };
  }
}
