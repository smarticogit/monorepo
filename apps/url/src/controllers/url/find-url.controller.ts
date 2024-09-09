import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response as ReqExpress } from 'express';
import { FindUrlService } from 'src/services/find-url.service';

@Controller()
export class FindUrlController {
  constructor(private findUrlService: FindUrlService) {}

  @Get('urls/:code')
  async handle(
    @Param('code') code: string,
    @Res() res: ReqExpress,
  ): Promise<any> {
    const url = await this.findUrlService.run(code);
    return res.status(200).redirect(url.urlOriginal);
  }
}
