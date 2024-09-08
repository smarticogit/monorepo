import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class FindUrlController {
  constructor(private prismaService: PrismaService) {}

  @Get('urls/:code')
  async handle(@Param('code') code: string, @Res() res: Response) {
    const url = await this.prismaService.url.findUnique({
      where: { short: code },
    });

    if (url) {
      return res.redirect(url.original);
    } else {
      return res.status(404).send('URL not found');
    }
  }
}
