import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UrlRepository } from 'src/repositories/url.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class FindAllUrlService {
  constructor(
    @Inject('UrlRepository') private urlRepository: UrlRepository,
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async run(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UnauthorizedException('Url not found');

    const urls = await this.urlRepository.findAll(user.id);
    return urls;
  }
}
