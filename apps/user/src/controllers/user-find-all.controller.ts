import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/user')
export class UserFindAllController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle() {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
