import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UrlRepository } from 'src/repositories/url.repository';
import { CreateUrl, Url } from 'src/schemas/url.schema';

@Injectable()
export class PrismaUrlRepository implements UrlRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(url: CreateUrl): Promise<void> {
    await this.prismaService.url.create({
      data: {
        url_original: url.url_original,
        url_short: url.url_short,
        url_code: url.url_code,
        userId: url.userId || null,
      },
    });
  }
  async findAll(userId: string): Promise<Url[]> {
    const urls = await this.prismaService.url.findMany({
      where: {
        userId: userId,
        deleted_at: null,
      },
    });

    return urls;
  }

  async findByCode(urlCode: string): Promise<Url | null> {
    const url = await this.prismaService.url.findUnique({
      where: {
        url_code: urlCode,
      },
    });

    return url;
  }

  async findById(urlId: string): Promise<Url | null> {
    const url = await this.prismaService.url.findUnique({
      where: {
        id: urlId,
      },
    });

    return url;
  }

  async updateByCode(urlCode: string): Promise<void> {
    await this.prismaService.url.update({
      where: {
        url_code: urlCode,
      },
      data: {
        access_count: {
          increment: 1,
        },
      },
    });
  }

  async updateById(urlId: string, urlOriginal: string): Promise<void> {
    await this.prismaService.url.update({
      where: {
        url_code: urlId,
      },
      data: {
        url_original: urlOriginal,
        updated_at: new Date(),
      },
    });
  }

  async delete(urlId: string): Promise<void> {
    await this.prismaService.url.update({
      where: {
        id: urlId,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
