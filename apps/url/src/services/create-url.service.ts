import { Inject, Injectable } from '@nestjs/common';
import { UrlRepository } from 'src/repositories/url.repository';
import { UserRepository } from 'src/repositories/user.repository';

import { UrlShorteningService } from 'src/utils/short-url-generator';

@Injectable()
export class CreateUrlService {
  constructor(
    @Inject('UrlRepository') private urlRepository: UrlRepository,
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async run(urlOriginal: string, baseUrl: string, userId?: string) {
    const urlCode = UrlShorteningService.generateUrlCode();

    const urlShortened = `${baseUrl}/${urlCode}`;

    if (userId) {
      const userFound = await this.userRepository.findById(userId);

      await this.urlRepository.create({
        url_original: urlOriginal,
        url_short: urlShortened,
        url_code: urlCode,
        userId: userFound?.id,
      });
    } else {
      await this.urlRepository.create({
        url_original: urlOriginal,
        url_short: urlShortened,
        url_code: urlCode,
        userId: null,
      });
    }
    return {
      urlOriginal,
      urlCode,
      short: urlShortened,
    };
  }
}
