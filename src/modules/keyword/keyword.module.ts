import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { Keyword, KeywordSchema } from './keyword.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Keyword.name, schema: KeywordSchema },
    ]),
  ],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
