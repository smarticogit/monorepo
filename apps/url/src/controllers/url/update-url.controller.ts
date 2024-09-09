import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UpdateUrlService } from 'src/services/update-url.service';

@Controller('/urls/:id')
@UseGuards(AuthGuard('jwt'))
export class UpdateUrlController {
  constructor(private updateUrlService: UpdateUrlService) {}

  @Put()
  async handle(
    @Param('id') urlId: string,
    @Res() res: Response,
    @Body() body: { url_original: string },
  ) {
    const { url_original } = body;
    const urlUpdated = await this.updateUrlService.run(urlId, url_original);
    return res.status(200).json(urlUpdated);
  }
}
