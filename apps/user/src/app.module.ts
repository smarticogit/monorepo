import { Module } from '@nestjs/common';
import { UserCreateController } from './controllers/user-create.controller';
import { UserFindAllController } from './controllers/user-find-all.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [UserCreateController, UserFindAllController],
  providers: [PrismaService],
})
export class AppModule {}
