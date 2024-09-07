import { Module } from '@nestjs/common';
import { UrlFindAllController } from './controllers/url-find-all.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [UrlFindAllController],
  providers: [PrismaService],
})
export class AppModule {}
