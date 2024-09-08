import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/users')
export class FindAllUserController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle() {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
