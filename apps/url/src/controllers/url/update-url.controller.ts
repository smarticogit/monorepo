import { Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/urls')
@UseGuards(AuthGuard('jwt'))
export class UpdateUrlController {
  constructor(private prismaService: PrismaService) {}

  @Put()
  async handle() {
    return 'Update';
  }
}
