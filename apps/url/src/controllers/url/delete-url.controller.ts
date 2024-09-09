import { Controller, Delete, Param, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/urls/:id')
@UseGuards(AuthGuard('jwt'))
export class DeleteUrlController {
  constructor(private prismaService: PrismaService) {}

  @Delete()
  async handle(@Param('id') urlId: string, @Res() res: Response) {
    const url = await this.prismaService.url.findUnique({
      where: {
        id: urlId,
      },
    });

    if (!url) {
      return res.status(404).send('URL not found');
    }

    if (url) {
      await this.prismaService.url.update({
        where: {
          id: urlId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    }

    return res.status(204).send();
  }
}
