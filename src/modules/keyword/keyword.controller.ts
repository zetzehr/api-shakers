import { Controller, Get } from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get()
  getKeywords() {
    return this.keywordService.getKeywords();
  }
}
