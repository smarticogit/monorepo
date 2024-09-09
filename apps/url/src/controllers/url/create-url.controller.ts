import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request as ReqExpress, Response as ResExpress } from 'express';
import { AuthOptional } from 'src/auth/auth-optional';
import { ZodValidationPipe } from 'src/pipes/zod.validation-pipes';
import { CreateUrl, createUrlSchema } from 'src/schemas/url.schema';
import { CreateUrlService } from 'src/services/create-url.service';

@Controller('/urls')
export class CreateUrlController {
  constructor(private createUrlService: CreateUrlService) {}

  @Post()
  @UseGuards(AuthOptional)
  @UsePipes(new ZodValidationPipe(createUrlSchema))
  async handle(
    @Body() body: CreateUrl,
    @Request() req: ReqExpress & { user: { sub: string } },
    @Response() res: ResExpress,
  ) {
    const { url_original: original } = body;
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const { user } = req;

    const output = await this.createUrlService.run(
      original,
      baseUrl,
      user?.sub,
    );

    return res.status(200).json({
      urlOriginal: output.urlOriginal,
      urlCode: output.urlCode,
      short: output.short,
    });
  }
}
