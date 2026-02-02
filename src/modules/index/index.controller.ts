import { Controller, Get } from '@nestjs/common';

@Controller('index')
export class IndexController {
  @Get()
  getHello() {
    return 'Hello World';
  }
}
