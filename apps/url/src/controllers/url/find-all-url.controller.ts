import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ReqExpress, Response as ResExpress } from 'express';
import { FindAllUrlService } from 'src/services/find-all-url.service';

@Controller('/urls')
@UseGuards(AuthGuard('jwt'))
export class FindAllUrlController {
  constructor(private findAllUrlService: FindAllUrlService) {}

  @Get()
  async handle(
    @Request() req: ReqExpress & { user: { sub: string } },
    @Res() res: ResExpress,
  ) {
    const { user } = req;
    const urls = await this.findAllUrlService.run(user?.sub);
    return res.status(200).json(urls);
  }
}
