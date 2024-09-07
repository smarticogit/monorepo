import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/user')
@UseGuards(AuthGuard('jwt'))
export class UserFindAllController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle() {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
