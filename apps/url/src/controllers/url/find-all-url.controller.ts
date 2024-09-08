import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/urls')
export class FindAllUrlController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle() {
    const urls = await this.prismaService.url.findMany();
    return urls;
  }
}
