import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { BusinessException } from './common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'user',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  // @Get()
  // @Version('1')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  getHello() {
    return 'i am old one';
  }

  @Get()
  @Version('2')
  getHello2() {
    return 'i am new one';
  }

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.appService.getHello();
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.appService.getHello();
  }

  @Get('getTestName')
  @Version([VERSION_NEUTRAL, '1'])
  getTestName() {
    console.log(this.configService.get('TEST_VALUE').url);

    return this.configService.get('TEST_VALUE').name;
  }
}
