import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CreateUrlController } from './controllers/url/create-url.controller';
import { DeleteUrlController } from './controllers/url/delete-url.controller';
import { FindAllUrlController } from './controllers/url/find-all-url.controller';
import { FindUrlController } from './controllers/url/find-url.controller';
import { UpdateUrlController } from './controllers/url/update-url.controller';
import { AuthController } from './controllers/user/auth.controller';
import { PrismaUrlRepository } from './database/prisma-url.repository';
import { PrismaUserRepository } from './database/prisma-user.repository';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';
import { CreateUrlService } from './services/create-url.service';
import { DeleteUrlService } from './services/delete-utl.service';
import { FindAllUrlService } from './services/find-all-url.service';
import { FindUrlService } from './services/find-url.service';
import { UpdateUrlService } from './services/update-url.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateUrlController,
    FindAllUrlController,
    UpdateUrlController,
    FindUrlController,
    DeleteUrlController,
    AuthController,
  ],
  providers: [
    PrismaService,
    CreateUrlService,
    FindUrlService,
    DeleteUrlService,
    UpdateUrlService,
    FindAllUrlService,
    {
      provide: 'UrlRepository',
      useClass: PrismaUrlRepository,
    },
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [],
})
export class AppModule {}
