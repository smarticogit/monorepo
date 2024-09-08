import { Controller, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/urls')
@UseGuards(AuthGuard('jwt'))
export class DeleteUrlController {
  constructor(private prismaService: PrismaService) {}

  @Delete()
  async handle() {
    return 'Delete';
  }
}
