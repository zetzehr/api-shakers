import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keyword } from './keyword.schema';

@Injectable()
export class KeywordService {
  constructor(
    @InjectModel(Keyword.name)
    private readonly keywordModel: Model<Keyword>,
  ) {}

  async getKeywords() {
    const result = await this.keywordModel.aggregate([
      {
        $project: {
          _id: 0,
          skills: 1,
          specialties: 1,
          industries: 1,
          categories: 1,
          subcategories: 1,
        },
      },
    ]);
    return result[0] || {};
  }
}
