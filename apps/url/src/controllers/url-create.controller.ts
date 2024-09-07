import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod.validation-pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import { UrlCreateBody, urlCreateBodySchema } from '../schemas/url.schema';

@Controller('/url')
export class UrlCreateController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(urlCreateBodySchema))
  async handle(@Body() body: UrlCreateBody) {
    const { original, short } = body;
    await this.prismaService.url.create({
      data: {
        original,
        short,
      },
    });
  }
}
