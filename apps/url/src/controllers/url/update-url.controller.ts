import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/urls/:id')
@UseGuards(AuthGuard('jwt'))
export class UpdateUrlController {
  constructor(private prismaService: PrismaService) {}

  @Put()
  async handle(
    @Param('id') urlId: string,
    @Res() res: Response,
    @Body() body: { url_original: string },
  ) {
    const url = await this.prismaService.url.findUnique({
      where: {
        id: urlId,
      },
    });

    console.log(body, '--->');

    if (!url) {
      return res.status(404).send('URL not found');
    }

    const urlUpdated = await this.prismaService.url.update({
      where: {
        id: urlId,
      },
      data: {
        url_original: body.url_original,
        updatedAt: new Date(),
      },
    });
    return res.status(200).json(urlUpdated);
  }
}
