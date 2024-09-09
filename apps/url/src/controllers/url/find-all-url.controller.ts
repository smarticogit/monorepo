import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ReqExpress } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/urls')
@UseGuards(AuthGuard('jwt'))
export class FindAllUrlController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle(@Request() req: ReqExpress & { user: { sub: string } }) {
    const { sub } = req?.user;

    const urls = await this.prismaService.url.findMany({
      where: {
        userId: sub,
        deletedAt: null,
      },
    });
    return urls;
  }
}
