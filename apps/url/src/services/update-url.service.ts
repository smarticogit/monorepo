import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UrlRepository } from 'src/repositories/url.repository';

@Injectable()
export class UpdateUrlService {
  constructor(@Inject('UrlRepository') private urlRepository: UrlRepository) {}

  async run(urlId: string, urlOriginal: string) {
    const url = await this.urlRepository.findById(urlId);

    if (!url) {
      throw new BadRequestException('Url not send or not found');
    }

    const urlUpdated = await this.urlRepository.updateById(urlId, urlOriginal);

    return urlUpdated;
  }
}
