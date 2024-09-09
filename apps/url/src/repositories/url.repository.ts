import { CreateUrl, Url } from 'src/schemas/url.schema';

export interface UrlRepository {
  create(url: CreateUrl): Promise<void>;
  findAll(userId: string): Promise<Url[]>;
  findByCode(urlCode: string): Promise<Url | null>;
  findById(urlId: string): Promise<Url | null>;
  updateByCode(urlCode: string): Promise<void>;
  updateById(urlId: string, urlOriginal: string): Promise<Url>;
  delete(urlId: string): Promise<void>;
}
