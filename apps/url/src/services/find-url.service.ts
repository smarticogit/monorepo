import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UrlRepository } from 'src/repositories/url.repository';

@Injectable()
export class FindUrlService {
  constructor(@Inject('UrlRepository') private urlRepository: UrlRepository) {}

  async run(urlCode: string) {
    const url = await this.urlRepository.findByCode(urlCode);

    if (!url) throw new BadRequestException('Url not found');

    if (url) {
      await this.urlRepository.updateByCode(urlCode);
    }

    return {
      urlOriginal: url.url_original,
    };
  }
}
