import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { Offer } from './offer.schema';
import { GetOffersQueryDto, GetOfferById } from './dto/get-offers.query.dto';
import { parseToNumberArray } from 'src/utils';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
  ) {}

  async getOffers(query: GetOffersQueryDto) {
    const {
      industries,
      category,
      subcategory,
      skills,
      specialties,
      sort = '1',
      page = '1',
    } = query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limit = 10;
    const skip = (pageNum - 1) * limit;
    const sortNum: 1 | -1 = sort === '1' ? -1 : 1;

    const industriesArr = parseToNumberArray(industries);
    const categoryArr = parseToNumberArray(category);
    const subcategoryArr = parseToNumberArray(subcategory);
    const skillsArr = parseToNumberArray(skills);
    const specialtiesArr = parseToNumberArray(specialties);

    const match: any = {};
    if (industriesArr.length)
      match['organization.industry'] = { $in: industriesArr };
    if (categoryArr.length) match.category = { $in: categoryArr };
    if (subcategoryArr.length) match.subcategory = { $in: subcategoryArr };
    if (skillsArr.length) match['positions.skills'] = { $in: skillsArr };
    if (specialtiesArr.length)
      match['positions.specialties'] = { $in: specialtiesArr };

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

  async getOfferById(query: GetOfferById) {
    const objectId = new Types.ObjectId(query.id);

    const pipeline: PipelineStage[] = [{ $match: { _id: objectId } }];

    const [offer] = await this.offerModel.aggregate(pipeline);

    return offer || null;
  }
}
