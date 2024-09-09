import { Controller, Delete, Param, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { DeleteUrlService } from 'src/services/delete-utl.service';

@Controller('/urls/:id')
@UseGuards(AuthGuard('jwt'))
export class DeleteUrlController {
  constructor(private deleteUrlService: DeleteUrlService) {}

  @Delete()
  async handle(@Param('id') urlId: string, @Res() res: Response) {
    await this.deleteUrlService.run(urlId);
    return res.status(204).send();
  }
}
