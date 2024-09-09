import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UrlRepository } from 'src/repositories/url.repository';

@Injectable()
export class DeleteUrlService {
  constructor(@Inject('UrlRepository') private urlRepository: UrlRepository) {}

  async run(urlId: string) {
    const url = await this.urlRepository.findById(urlId);

    if (!url) {
      throw new BadRequestException('Url not found');
    }

    if (url) {
      await this.urlRepository.delete(urlId);
    }
  }
}
