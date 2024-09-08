import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod.validation-pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import { UrlShorteningService } from 'src/services/short-url-generator';
import { UrlGenerateBody, urlGenerateBodySchema } from '../schemas/url.schema';

@Controller('/urls')
export class UrlGenerateController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(urlGenerateBodySchema))
  async handle(@Body() body: UrlGenerateBody) {
    const { original } = body;

    const urlShortened = UrlShorteningService.generateShortUrl();

    await this.prismaService.url.create({
      data: {
        original,
        short: urlShortened,
      },
    });

    return {
      urlShortened,
      originalUrl: original,
    };
  }
}
