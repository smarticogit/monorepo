import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserAuthenticateController } from './controllers/user-authenticate.controller';
import { UserCreateController } from './controllers/user-create.controller';
import { UserFindAllController } from './controllers/user-find-all.controller';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    UserCreateController,
    UserFindAllController,
    UserAuthenticateController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
