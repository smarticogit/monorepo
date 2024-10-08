import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlShorteningService {
  static generateUrlCode() {
    return Math.random().toString(36).substring(2, 8);
  }
}
