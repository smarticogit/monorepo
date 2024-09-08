import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod.validation-pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUrl, createUrlSchema } from 'src/schemas/url.schema';
import { UrlShorteningService } from 'src/services/short-url-generator';

@Controller('/urls')
export class CreateUrlController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUrlSchema))
  async handle(@Body() body: CreateUrl) {
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
