import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request as ReqExpress } from 'express';
import { AuthOptional } from 'src/auth/auth-optional';
import { ZodValidationPipe } from 'src/pipes/zod.validation-pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUrl, createUrlSchema } from 'src/schemas/url.schema';
import { UrlShorteningService } from 'src/services/short-url-generator';

@Controller('/urls')
export class CreateUrlController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @UseGuards(AuthOptional)
  @UsePipes(new ZodValidationPipe(createUrlSchema))
  async handle(
    @Body() body: CreateUrl,
    @Request() req: ReqExpress & { user: { sub: string } },
  ) {
    const { url_original: original } = body;
    const urlCode = UrlShorteningService.generateUrlCode();

    const urlShortened = `${req.protocol}://${req.get('host')}${req.originalUrl}/${urlCode}`;

    const { sub } = req?.user;

    if (sub) {
      const userFound = await this.prismaService.user.findUnique({
        where: {
          id: sub,
        },
      });

      await this.prismaService.url.create({
        data: {
          url_original: original,
          url_short: urlShortened,
          url_code: urlCode,
          userId: userFound?.id,
        },
      });
    } else {
      await this.prismaService.url.create({
        data: {
          url_original: original,
          url_short: urlShortened,
          url_code: urlCode,
          userId: null,
        },
      });
    }
    return {
      original,
      urlCode,
      short: urlShortened,
    };
  }
}
