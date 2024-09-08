import { Module } from '@nestjs/common';
import { UrlGenerateController } from './controllers/url-code.controller';
import { UrlFindController } from './controllers/url-find.controller';
import { UrlShortCodeController } from './controllers/url-short-code.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [
    UrlFindController,
    UrlGenerateController,
    UrlShortCodeController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
