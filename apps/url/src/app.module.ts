import { Module } from '@nestjs/common';
import { UrlCreateController } from './controllers/url-create.controller';
import { UrlFindAllController } from './controllers/url-find-all.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [UrlFindAllController, UrlCreateController],
  providers: [PrismaService],
})
export class AppModule {}
